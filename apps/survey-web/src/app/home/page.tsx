import { Card } from '@ssoon-servey/shared-ui';
import { useGetSurveyList } from '../survey/hooks/useSurvey';
import * as $ from './page.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { data: surveyList, isError, isLoading } = useGetSurveyList();
  if (isError) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      {surveyList.map((survey, i) => (
        <Card>
          <Link to={`survey/${survey.id}`}>
            <div
              className={$.cardWrapper}
            >{`설문 제목 :  ${survey.title}`}</div>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
