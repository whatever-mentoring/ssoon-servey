import { Survey, useCreateSurvey } from '../hooks/query/useServey';

const payload: Survey = {
  title: '설문입니다.',
  sections: [
    {
      items: [
        {
          title: 'radio input 1번째',
          type: 'radio',
          required: true,
          options: [
            { text: 'radio option1 1번째' },
            { text: 'radio option2 1번째' },
            { text: 'radio option3 1번째' },
          ],
        },
        {
          title: 'checkbox input 1번째',
          type: 'radio',
          required: true,
          options: [
            { text: 'checkbox option1 1번째' },
            { text: 'checkbox option2 1번째' },
            { text: 'checkbox option3 1번째' },
          ],
        },
      ],
    },
    {
      items: [
        {
          title: 'select 1번째',
          type: 'select',
          required: true,
          options: [
            {
              text: 'select option1 1번째',
            },
            {
              text: 'select option2 1번째',
            },
            {
              text: 'select option3 1번째',
            },
          ],
        },
        { title: 'select 1번째', type: 'textarea', required: true },
      ],
    },
  ],
};

export function App() {
  const mutate = useCreateSurvey();

  const onMutateSurvey = () => {
    mutate(payload);
  };
  return (
    <div>
      <h2>설문 만들기</h2>
      <button onClick={onMutateSurvey}>제출</button>
    </div>
  );
}

export default App;
