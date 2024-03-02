import { useGetSurvey } from './hooks/useSurvey';
import { Block, Card } from '@ssoon-servey/shared-ui';
import * as $ from './page.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const INITIAL_ID = 1;

const SurveyPage = () => {
  const { data, isError, isLoading } = useGetSurvey();
  const { id } = useParams();
  const sectionId = Number(id);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/survey/${INITIAL_ID}`, { replace: true });
  }, []);

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  const goNextSection = () => {
    navigate(`/survey/${sectionId + 1}`);
  };

  const goBackSection = () => {
    navigate(-1);
  };

  const sections = data.sections[sectionId - 1];

  return (
    <div className={$.cardContainer}>
      <Card>
        <div className={$.borderTop} />
        <div className={$.cardWrapper}>
          <span>{data?.title}</span>
          <div>* 표시는 필수 질문임</div>
        </div>
      </Card>
      {sections.items.map((item) => (
        <Card key={item.id}>
          <div className={$.cardWrapper}>
            <div>{item.question_title}</div>
            {item.options.map((option) => (
              <div key={option.id}>{option.option_text}</div>
            ))}
          </div>
        </Card>
      ))}

      <div>
        {sections.isPrevious && <button onClick={goBackSection}>이전</button>}
        {sections.isNext && <button onClick={goNextSection}>다음</button>}
      </div>
    </div>
  );
};

export default SurveyPage;
