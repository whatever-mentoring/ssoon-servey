import { useNavigate } from 'react-router-dom';
import * as $ from './SurveyBottomNav.css';
import usePageValue from '../../hooks/usePageValue';
import {
  SurveyForm,
  useSurveyFormContext,
} from '../../hooks/useSurveyFormContext';
import { validate } from '../../utils/validate';
import { useDeleteSurveyAnswer } from '../../hooks/api/useSurvey';

const sectionFormErrorCheck = (surveyFormValue: SurveyForm) => {
  let errorCount = 0;
  const form: SurveyForm = {};
  for (const itemId in surveyFormValue) {
    const surveyForm = surveyFormValue[itemId];
    if (surveyForm.required) {
      const isError = validate(surveyForm.type, surveyForm.value);
      if (isError) errorCount += 1;
      form[itemId] = {
        ...surveyFormValue[itemId],
        error: isError,
      };
    }
  }
  return { form, errorCount };
};

interface SectionBottomNav {
  isPrevious?: boolean;
  isNext?: boolean;
}
const SectionBottomNav = ({ isPrevious, isNext }: SectionBottomNav) => {
  const { surveyId, pageNumber } = usePageValue();
  const [mutate] = useDeleteSurveyAnswer();
  const { surveyFormValue, setSurveyFormValue } = useSurveyFormContext();
  const navigate = useNavigate();

  const goNext = () => {
    const { form, errorCount } = sectionFormErrorCheck(surveyFormValue);
    setSurveyFormValue(form);
    if (errorCount > 0) {
      return;
    } else {
      navigate(`/survey/${surveyId}?page=${pageNumber + 1}`);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const onReset = () => {
    if (!surveyFormValue) return;

    const form: SurveyForm = {};
    for (const itemId in surveyFormValue) {
      const surveyForm = surveyFormValue[itemId];
      form[itemId] = {
        ...surveyForm,
        error: false,
        value: undefined,
      };
      mutate({
        surveyId,
        itemId: Number(itemId),
      });
    }
    setSurveyFormValue(form);
  };

  const onSubmit = () => {
    const { form, errorCount } = sectionFormErrorCheck(surveyFormValue);
    setSurveyFormValue(form);
    if (errorCount > 0) {
      return;
    } else {
      navigate(`/complete/${surveyId}`);
      console.log('제출');
      return;
    }
  };
  return (
    <div className={$.surveyNavContainer}>
      <div>
        {isPrevious && (
          <button className={$.backButton} onClick={goBack}>
            뒤로
          </button>
        )}
        {isNext && (
          <button className={$.nextButton} onClick={goNext}>
            다음
          </button>
        )}
        {!isNext && (
          <button className={$.submitButton} onClick={onSubmit}>
            제출
          </button>
        )}
      </div>
      <div>
        <button className={$.resetButton} onClick={onReset}>
          양식 지우기
        </button>
      </div>
    </div>
  );
};

export default SectionBottomNav;
