import {
  type SupabaseContextValue,
  useSupabaseContext,
} from '@ssoon-servey/supabase';
import { useEffect, useState } from 'react';

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
  question_type: 'radio' | 'select' | 'checkbox';
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
              question_type: 'radio' | 'select' | 'checkbox';
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
  };
};

const useGetSurvey = (id: number): apiState<Survey> => {
  const { supabase } = useSupabaseContext();
  const [data, setData] = useState<Survey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    api(supabase)
      .getSurvey(id)
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [supabase]);

  return { data, isLoading, isError } as apiState<Survey>;
};

type SurveyList = Array<Omit<Survey, 'sections'>>;

const useGetSurveyList = (): apiState<SurveyList> => {
  const { supabase } = useSupabaseContext();
  const [data, setData] = useState<SurveyList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    api(supabase)
      .getSurveyList()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [supabase]);

  return { data, isLoading, isError } as apiState<SurveyList>;
};

export { useGetSurvey, useGetSurveyList };
