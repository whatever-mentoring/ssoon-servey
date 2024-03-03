import { Card } from '@ssoon-servey/shared-ui';
import * as $ from './SurveyTitle.css';

const SurveyTitle = ({ title }: { title: string }) => {
  return (
    <Card>
      <div className={$.borderTop} />
      <div className={$.cardWrapper}>
        <h2 className={$.surveyTitle}>{title}</h2>
        <div className={$.emphasize}>* 표시는 필수 질문임</div>
      </div>
    </Card>
  );
};

export default SurveyTitle;
