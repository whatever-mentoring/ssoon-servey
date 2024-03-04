import { useGetSurvey, useGetSurveyAnswer } from './hooks/api/useSurvey';
import * as $ from './page.css';
import SurveyTitle from './components/SurveyTitle';
import SurveyItem from './components/SurveyItem';
import SurveyBottomNav from './components/SurveyBottomNav';
import usePageValue from './hooks/usePageValue';
import { useEffect, useMemo, useState } from 'react';
import { SurveyForm, SurveyFormContext } from './hooks/useSurveyFormContext';
import { itemsType } from './types/items.type';

const SurveyPage = () => {
  const { surveyId, pageNumber } = usePageValue();
  const { data, isError, isLoading } = useGetSurvey(surveyId);
  const { data: answers } = useGetSurveyAnswer(pageNumber);

  const [surveyFormValue, setSurveyFormValue] = useState<SurveyForm>(undefined);
  const section = data?.sections.filter(
    (section) => section.survey_id === surveyId
  )[pageNumber - 1];

  useEffect(() => {
    if (!section) return;

    const obj: SurveyForm = {};
    for (const item of section?.items ?? []) {
      const { id } = item;

      const answerValue = answers
        ?.filter((answer) => answer.item_id === id)
        .map((answer) => answer.value);

      obj[id] = {
        value: answerValue ?? surveyFormValue?.[id]?.value,
        required: item.question_required,
        type: item.question_type,
        error: false,
      };
    }

    setSurveyFormValue(obj);
  }, [data, section]);

  const formContextValue = useMemo(
    () => ({
      surveyFormValue,
      setSurveyFormValue: (form: SurveyForm) => {
        setSurveyFormValue(form);
      },
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
      }) => {
        setSurveyFormValue((prev) => ({
          ...prev,
          [itemId]: {
            value,
            type,
            required,
            error,
          },
        }));
      },
    }),
    [surveyFormValue]
  );

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className={$.cardContainer}>
      <SurveyTitle title={data.title} />
      <SurveyFormContext.Provider value={formContextValue}>
        {section?.items.map((item) => (
          <SurveyItem
            key={item.id}
            itemId={item.id}
            type={item.question_type}
            title={item.question_title}
            options={item.options}
            isRequired={item.question_required}
          />
        ))}
        <div>
          <SurveyBottomNav
            isNext={section?.isNext}
            isPrevious={section?.isPrevious}
          />
        </div>
      </SurveyFormContext.Provider>
    </div>
  );
};

export default SurveyPage;
