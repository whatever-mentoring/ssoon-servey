import { Card } from '@ssoon-servey/shared-ui';
import { cardWrapper } from './Toolbar.css';

interface Props {
  onAddItems: () => void;
  onAddSections: () => void;
}

const ToolBar = ({ onAddItems, onAddSections }: Props) => {
  return (
    <Card>
      <div className={cardWrapper}>
        <button onClick={onAddItems}>
          <svg width={23} height={23} viewBox="0 0 25 25">
            <g xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#5F6368"
                d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075                           0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2                           12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12                           2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22                           12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12                           22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4                           8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"
              />
            </g>
          </svg>
        </button>
        <button onClick={onAddSections}>
          <svg width={23} height={23} viewBox="0 0 25 25">
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="#5F6368"
              d="M19 5v4H4V5h15m0 10v4H4v-4h15m1-12H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm0 10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1z"
            />
          </svg>
        </button>
      </div>
    </Card>
  );
};

export default ToolBar;
