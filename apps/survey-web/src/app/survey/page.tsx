import { useGetSurvey } from './hooks/useSurvey';
import * as $ from './page.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SurveyTitle from './components/SurveyTitle';
import SurveyItem from './components/SurveyItem';
import SurveyNav from './components/SurveyNav';

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

  const onSubmit = () => {
    navigate('');
  };

  const section = data.sections[sectionId - 1];

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
