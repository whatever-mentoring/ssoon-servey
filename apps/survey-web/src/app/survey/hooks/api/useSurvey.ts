import {
  type SupabaseContextValue,
  useSupabaseContext,
} from '@ssoon-servey/supabase';
import { useEffect, useState } from 'react';
import { itemsType } from '../../types/items.type';

export type Options = {
  id: number;
  option_text: string;
  item_id: number | null;
};

export type SurveyItems = {
  id: number;
  options: Options[];
  question_required: boolean;
  question_title: string;
  question_type: itemsType;
  section_id: number | null;
};

type SurveySections = {
  id: number;
  survey_title: string | null;
  survey_id: number | null;
  items: SurveyItems[];
  isNext: boolean;
  isPrevious: boolean;
};

type Survey = {
  id: number;
  title: string;
  description?: string | null;

  sections: SurveySections[];
};

type Answer = {
  item_id: number;
  item_title: string;
  value: string;
};

type AnswerParams = {
  surveyId: number;
  itemId: number;
  text?: string;
  optionsId?: number | number[];
};

type apiState<T> =
  | {
      data: null;
      isLoading: false;
      isError: true;
    }
  | {
      data: null;
      isLoading: true;
      isError: false;
    }
  | {
      data: T;
      isLoading: false;
      isError: false;
    };

const api = (supabase: SupabaseContextValue['supabase']) => {
  return {
    async getSurvey(id: number) {
      const { data: surveys } = await supabase
        .from('surveys')
        .select('id,title,description');
      if (!surveys) return null;

      const _survey = surveys.find((survey) => survey.id === id)!;

      const { data: sections } = await supabase
        .from('survey_sections')
        .select('*');
      if (!sections) return null;

      const { data: items } = await supabase.from('survey_items').select('*');
      if (!items) return null;

      const { data: options } = await supabase
        .from('question_options')
        .select('*');
      if (!options) return null;

      const survey: Survey = {
        ..._survey,
        sections: sections.map((section, i) => ({
          ...section,
          isNext: i !== sections.length - 1,
          isPrevious: i !== 0,
          items: (
            items as {
              id: number;
              question_required: boolean;
              question_title: string;
              question_type: itemsType;
              section_id: number | null;
            }[]
          )
            .filter((item) => item.section_id === section.id)
            .map((items) => ({
              ...items,
              options: options.filter((option) => option.item_id === items.id),
            })),
        })),
      };
      return survey;
    },
    async getSurveyList() {
      const { data: surveys } = await supabase
        .from('surveys')
        .select('id,title,description');
      return surveys;
    },
    async getSurveyAnswers() {
      const answerId = 1;
      const { data: answers, error: answerError } = await supabase
        .from('answer_rel')
        .select('*')
        .eq('answer_id', answerId);
      if (answerError) throw answerError;

      const textList = answers
        .filter((answer) => answer.text)
        .map((answer) => ({ item_id: answer.items_id, value: answer.text! }));

      const { data: options, error } = await supabase
        .from('question_options')
        .select('*')
        .in('item_id', answers?.map((answer) => answer.items_id) ?? []);

      if (error) throw error;

      const optionList = options
        .filter((option) =>
          answers.some((answer) => answer.options_id === option.id)
        )
        .map((option) => ({
          item_id: option.item_id!,
          value: option.option_text,
        }));

      const answersList = textList.concat(optionList);

      const { data: items } = await supabase
        .from('survey_items')
        .select('*')
        .in('id', answers?.map((answer) => answer.items_id) ?? []);

      return answersList.map((answer) => ({
        ...answer,
        item_title:
          items?.find((item) => item.id === answer.item_id)?.question_title ??
          '',
      }));
    },

    async postSurveyAnswers({
      surveyId,
      itemId,
      text,
      optionsId,
    }: AnswerParams) {
      const _answerId = 1;
      const { data: answerId } = await supabase
        .from('answer')
        .select(`id`)
        .eq('survey_id', surveyId)
        .eq('id', _answerId)
        .single();

      const { data: answer, error: answerError } = await supabase
        .from('answer')
        .upsert({ id: answerId?.id, survey_id: surveyId })
        .select('*')
        .single();

      if (answerError) throw answerError;
      if (!answer) return;

      const { data: answerRelId } = await supabase
        .from('answer_rel')
        .select(`id`)
        .eq('items_id', itemId);

      if (Array.isArray(optionsId)) {
        const answerRel = optionsId.map((optionId) => ({
          answer_id: answer.id,
          items_id: itemId,
          options_id: optionId as number | null,
        }));
        if (optionsId.length === 0) {
          answerRel.push({
            answer_id: answer.id,
            items_id: itemId,
            options_id: null,
          });
        }
        await supabase.from('answer_rel').delete().eq('items_id', itemId);
        await supabase.from('answer_rel').insert(answerRel);
      } else {
        await supabase.from('answer_rel').upsert({
          id: answerRelId?.[0]?.id,
          answer_id: answer.id,
          items_id: itemId,
          options_id: optionsId ?? null,
          text: text ?? null,
        });
      }
    },
    async deleteSurveyAnswer({
      surveyId,
      itemId,
    }: Pick<AnswerParams, 'surveyId' | 'itemId'>) {
      const { data: answerId } = await supabase
        .from('answer')
        .select(`id`)
        .eq('survey_id', surveyId)
        .single();

      const { error: answerError } = await supabase
        .from('answer')
        .upsert({ id: answerId?.id, survey_id: surveyId })
        .select('*')
        .single();

      if (answerError) throw answerError;

      const { error: answerRelError } = await supabase
        .from('answer_rel')
        .delete()
        .eq('items_id', itemId);
      if (answerRelError) throw answerRelError;
    },
  };
};

const useGetSurvey = (id: number): apiState<Survey> => {
  const { supabase } = useSupabaseContext();
  const [data, setData] = useState<Survey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getSurvey = async () => {
    try {
      const data = await api(supabase).getSurvey(id);
      setData(data);
      setIsLoading(false);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    getSurvey();
  }, [supabase]);

  return { data, isLoading, isError } as apiState<Survey>;
};

type SurveyList = Array<Omit<Survey, 'sections'>>;

const useGetSurveyList = (): apiState<SurveyList> => {
  const { supabase } = useSupabaseContext();
  const [data, setData] = useState<SurveyList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getSurveyList = async () => {
    try {
      const data = await api(supabase).getSurveyList();
      setData(data);
      setIsLoading(false);
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSurveyList();
  }, [supabase]);

  return { data, isLoading, isError } as apiState<SurveyList>;
};

const useGetSurveyAnswer = (pageNumber?: number): apiState<Answer[]> => {
  const { supabase } = useSupabaseContext();
  const [data, setData] = useState<Answer[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getSurveyAnswers = async () => {
    try {
      const data = await api(supabase).getSurveyAnswers();
      setData(data);
      setIsLoading(false);
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSurveyAnswers();
  }, [supabase, pageNumber]);

  return { data, isLoading, isError } as apiState<Answer[]>;
};

const usePostSurveyAnswers = () => {
  const { supabase } = useSupabaseContext();
  const mutate = (params: AnswerParams) => {
    return api(supabase).postSurveyAnswers(params);
  };
  return [mutate];
};
const useDeleteSurveyAnswer = () => {
  const { supabase } = useSupabaseContext();
  const mutate = (params: Pick<AnswerParams, 'surveyId' | 'itemId'>) => {
    return api(supabase).deleteSurveyAnswer(params);
  };
  return [mutate];
};

export {
  useGetSurvey,
  useGetSurveyList,
  useGetSurveyAnswer,
  usePostSurveyAnswers,
  useDeleteSurveyAnswer,
};
