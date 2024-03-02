import {
  SupabaseContextValue,
  useSupabaseContext,
} from '@ssoon-servey/supabase';
import { useEffect, useState } from 'react';

type Options = {
  id: number;
  option_text: string;
  item_id: number | null;
};

type SurveyItems = {
  id: number;
  options: Options[];
  question_required: boolean;
  question_title: string;
  question_type: string;
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

const getSurvey = async (supabase: SupabaseContextValue['supabase']) => {
  const { data: surveys } = await supabase
    .from('surveys')
    .select('id,title,description');
  if (!surveys) return null;

  const _survey = surveys[0];

  const { data: sections } = await supabase.from('survey_sections').select('*');
  if (!sections) return null;

  const { data: items } = await supabase.from('survey_items').select('*');
  if (!items) return null;

  const { data: options } = await supabase.from('question_options').select('*');
  if (!options) return null;

  const survey: Survey = {
    ..._survey,
    sections: sections.map((section, i) => ({
      ...section,
      isNext: i !== sections.length - 1,
      isPrevious: i !== 0,
      items: items
        .filter((item) => item.section_id === section.id)
        .map((items) => ({
          ...items,
          options: options.filter((option) => option.item_id === items.id),
        })),
    })),
  };
  return survey;
};

const useGetSurvey = (): apiState<Survey> => {
  const { supabase } = useSupabaseContext();
  const [data, setData] = useState<Survey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getSurvey(supabase)
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

export { useGetSurvey };
