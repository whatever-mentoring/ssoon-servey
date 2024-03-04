import { Card } from '@ssoon-servey/shared-ui';
import * as $ from './page.css';
import usePageValue from '../survey/hooks/usePageValue';
import {
  useGetSurvey,
  useGetSurveyAnswer,
} from '../survey/hooks/api/useSurvey';
import { Link } from 'react-router-dom';

const CompletePage = () => {
  const { surveyId } = usePageValue();
  const { data, isError, isLoading } = useGetSurvey(surveyId);
  const { data: answers } = useGetSurveyAnswer();
  if (isError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <Card>
      <div className={$.borderTop} />
      <div className={$.cardWrapper}>
        <h2 className={$.surveyTitle}>{data.title}</h2>
        <div className={$.emphasize}>응답이 기록되었습니다.</div>
        <p>
          {JSON.stringify(
            answers?.map((answer) => ({ [answer.item_title]: answer.value }))
          )}
        </p>
        <Link to={`/survey/${surveyId}`}>처음으로</Link>
      </div>
    </Card>
  );
};

export default CompletePage;
