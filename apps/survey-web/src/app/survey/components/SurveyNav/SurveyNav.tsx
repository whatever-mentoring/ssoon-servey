import * as $ from './SurveyNav.css';

const SectionNav = ({
  isPrevious,
  isNext,
  goNext,
  goBack,
  onSubmit,
}: {
  isPrevious: boolean;
  isNext: boolean;
  goNext: () => void;
  goBack: () => void;
  onSubmit: () => void;
}) => {
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
        <button className={$.resetButton}>양식 지우기</button>
      </div>
    </div>
  );
};

export default SectionNav;
