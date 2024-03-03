import { useGetSurvey } from './hooks/useSurvey';
import * as $ from './page.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SurveyTitle from './components/SurveyTitle';
import SurveyItem from './components/SurveyItem';
import SurveyNav from './components/SurveyNav';

const SurveyPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const surveyId = Number(id);
  const page = searchParams.get('page');
  const pageNumber = page ? Number(page) : 1;
  const { data, isError, isLoading } = useGetSurvey(surveyId);

  const navigate = useNavigate();

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  const section = data.sections.filter(
    (section) => section.survey_id === surveyId
  )[pageNumber - 1];

  const goNextSection = () => {
    navigate(`/survey/${surveyId}?page=${pageNumber + 1}`);
  };

  const goBackSection = () => {
    navigate(-1);
  };

  const onSubmit = () => {
    navigate('');
  };

  return (
    <div className={$.cardContainer}>
      <SurveyTitle title={data.title} />
      {section.items.map((item) => (
        <SurveyItem
          key={item.id}
          type={item.question_type}
          title={item.question_title}
          options={item.options}
          isRequired={item.question_required}
        />
      ))}
      <div>
        <SurveyNav
          isNext={section.isNext}
          isPrevious={section.isPrevious}
          goNext={goNextSection}
          goBack={goBackSection}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default SurveyPage;
