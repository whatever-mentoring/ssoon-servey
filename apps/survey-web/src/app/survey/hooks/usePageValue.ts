import { useParams, useSearchParams } from 'react-router-dom';

const usePageValue = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const surveyId = Number(id);
  const page = searchParams.get('page');
  const pageNumber = page ? Number(page) : 1;

  return { surveyId, pageNumber };
};

export default usePageValue;
