import { Card, Radio } from '@ssoon-servey/shared-ui';
import { cardWrapper } from './SurveyItem.css';
import { type SurveyItem } from '../../hooks/query/useServey';

interface SurveyItemProps {
  item: SurveyItem;
  onActiveItem: () => void;
  onAddOptions: () => void;
  onChangeOptionText: (value: string, optionIndex: number) => void;
  onChangeItemTitle: (value: string) => void;
}

const SurveyItem = ({
  item,
  onActiveItem,
  onAddOptions,
  onChangeOptionText,
  onChangeItemTitle,
}: SurveyItemProps) => {
  const handleAddOptions = () => {
    onAddOptions();
  };
  const handleItemsTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    onChangeItemTitle(value);
  };
  const handleOptionTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    const { value } = e.currentTarget;
    onChangeOptionText(value, optionIndex);
  };
  return (
    <Card onClick={onActiveItem}>
      <div className={cardWrapper}>
        <div>
          <input
            placeholder="질문"
            onChange={handleItemsTitleChange}
            value={item.title}
          />
          {/* <select>
            <option value="textarea">장문형</option>
            <option value="radio" selected>
              객관식
            </option>
            <option value="checkbox">체크박스</option>
            <option value="select">드롭다운</option>
          </select> */}
        </div>
        <div>
          {
            <>
              {item.options.map((option, i) => (
                <label key={i}>
                  <Radio disabled />
                  <input
                    type="text"
                    placeholder={option.text}
                    onChange={(e) => handleOptionTextChange(e, i)}
                    value={option.text}
                  />
                </label>
              ))}
              <button onClick={handleAddOptions}>옵션추가</button>
            </>
          }
        </div>
      </div>
    </Card>
  );
};

export default SurveyItem;
