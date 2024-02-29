import { useSupabaseContext } from '@ssoon-servey/supabase';

interface Option {
  text: string;
}

interface Item {
  title: string;
  type: 'radio' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  options?: Option[];
}

interface Section {
  title?: string;
  items: Item[];
}

export interface Survey {
  title: string;
  description?: string;
  sections: Section[];
}

export const useCreateSurvey = () => {
  const { supabase } = useSupabaseContext();

  const createSurvey = async (title: string, description?: string) => {
    const { data: survey } = await supabase
      .from('surveys')
      .insert([{ title, description }])
      .select();
    return survey;
  };

  const createSections = async (serveyId: number, sections: Section[]) => {
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
    sections: Section[]
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
    sections: Section[]
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
