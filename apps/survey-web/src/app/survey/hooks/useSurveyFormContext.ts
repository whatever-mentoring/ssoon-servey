import { createContext, useContext } from 'react';
import { itemsType } from '../types/items.type';

export type SurveyForm =
  | {
      // itemId
      [key: string]: {
        value?: string[];
        type: itemsType;
        required: boolean;
        error: boolean;
      };
    }
  | undefined;

export type SurveyFormContextValue = {
  surveyFormValue: SurveyForm;
  setSurveyFormValue: (form: SurveyForm) => void;
  onChangeForm: ({
    value,
    itemId,
    type,
    required,
    error,
  }: {
    value: string | string[];
    itemId: number;
    type: itemsType;
    required: boolean;
    error: boolean;
  }) => void;
};

export const SurveyFormContext = createContext<SurveyFormContextValue | null>(
  null
);
SurveyFormContext.displayName = 'SurveyFormContext';

export const useSurveyFormContext = () => {
  const context = useContext(SurveyFormContext);

  if (context === null) {
    throw new Error(
      'useSurveyFormContext must be used within a <SupabaseProvider />'
    );
  }
  return context;
};
