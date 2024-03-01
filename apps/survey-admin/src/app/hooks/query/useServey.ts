import { useSupabaseContext } from '@ssoon-servey/supabase';
import { z } from 'zod';

const OptionSchema = z.object({
  text: z.string().min(1, { message: '텍스트를 입력해주세요' }),
});

const SurveyItemSchema = z.object({
  title: z.string().min(1, { message: '항목의 제목을 입력해주세요' }),
  type: z.enum(['radio', 'select', 'checkbox', 'textarea']),
  required: z.boolean(),
  options: z.array(OptionSchema),
});

const SurveySectionSchema = z.object({
  title: z.string().optional(),
  items: z.array(SurveyItemSchema),
});

const SurveySchema = z.object({
  title: z.string().min(1, { message: '설문 제목을 입력해주세요' }),
  description: z.string().optional(),
  sections: z.array(SurveySectionSchema),
});

export type Option = z.infer<typeof OptionSchema>;
export type SurveyItem = z.infer<typeof SurveyItemSchema>;
export type SurveySection = z.infer<typeof SurveySectionSchema>;
export type Survey = z.infer<typeof SurveySchema>;

export const useCreateSurvey = () => {
  const { supabase } = useSupabaseContext();

  const createSurvey = async (title: string, description?: string) => {
    const { data: survey } = await supabase
      .from('surveys')
      .insert([{ title, description }])
      .select();
    return survey;
  };

  const createSections = async (
    serveyId: number,
    sections: SurveySection[]
  ) => {
    const { data: survey_section } = await supabase
      .from('survey_sections')
      .insert(
        sections.map((section) => ({
          survey_title: section.title,
          survey_id: serveyId,
        }))
      )
      .select();
    return survey_section;
  };

  const createSurveyItems = async (
    sectionIds: number[],
    sections: SurveySection[]
  ) => {
    const insertItems: {
      section_id: number;
      question_title: string;
      question_type: 'radio' | 'select' | 'checkbox' | 'textarea';
      question_required: boolean;
      hasOption: boolean;
    }[] = [];

    sectionIds.forEach((id, i) => {
      sections[i].items.forEach((item) =>
        insertItems.push({
          section_id: id,
          question_title: item.title,
          question_type: item.type,
          question_required: item.required,
          hasOption: !!item.options,
        })
      );
    });

    const { data: survey_items } = await supabase
      .from('survey_items')
      .insert(insertItems)
      .select();

    return survey_items;
  };

  const createItemOptions = async (
    surveyItemIds: number[],
    sections: SurveySection[]
  ) => {
    const insertOptions: { item_id: number; option_text: string }[] = [];

    surveyItemIds.forEach((id, i) => {
      const options = sections.flatMap((section) =>
        section.items.map((item) => item.options)
      );
      options[i]?.forEach((option) => {
        insertOptions.push({
          item_id: id,
          option_text: option.text,
        });
      });
    });

    await supabase.from('question_options').insert(insertOptions).select();
  };

  const mutate = async (payload: Survey) => {
    SurveySchema.parse(payload);
    const { title, description, sections } = payload;

    const survey = await createSurvey(title, description);
    if (!survey) return;

    const survey_section = await createSections(survey[0].id, sections);
    if (!survey_section) return;

    const survey_items = await createSurveyItems(
      survey_section.map((section) => section.id),
      sections
    );
    if (!survey_items) return;

    await createItemOptions(
      survey_items.map((item) => item.id),
      sections
    );
  };

  return mutate;
};
