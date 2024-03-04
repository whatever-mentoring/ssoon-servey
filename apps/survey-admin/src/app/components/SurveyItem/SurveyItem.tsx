import { Card, Checkbox, Radio, vars } from '@ssoon-servey/shared-ui';
import {
  activeStyle,
  bar,
  button,
  cardWrapper,
  inputFocusStyle,
  itemFooterContainer,
  itemFooterWrapper,
  optionAddButton,
  optionContainer,
  optionWrapper,
  questionContainer,
  questionInputTitle,
  required,
  selectBox,
  selectBoxContainer,
} from './SurveyItem.css';
import { type SurveyItem } from '../../hooks/query/useServey';
import { useRef } from 'react';
import { itemsType } from '../../types/items.type';

interface SurveyItemProps {
  item: SurveyItem;
  isActive: boolean;
  onActiveItem: () => void;
  onAddOptions: () => void;
  onChangeOptionText: (value: string, optionIndex: number) => void;
  onChangeItemType: (type: itemsType) => void;
  onChangeItemTitle: (value: string) => void;
  onChangeItemRequired: (isRequired: boolean) => void;
  onDeleteItem: () => void;
}

const SurveyItem = ({
  item,
  isActive,
  onActiveItem,
  onAddOptions,
  onChangeOptionText,
  onChangeItemType,
  onChangeItemTitle,
  onChangeItemRequired,
  onDeleteItem,
}: SurveyItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleAddOptions = () => {
    onAddOptions();
  };
  const handleActiveItem = () => {
    onActiveItem();
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
  const handleChangeItemType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    onChangeItemType(value as itemsType);
  };
  const handleItemRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    onChangeItemRequired(checked);
  };
  const handleDeleteItem = () => {
    onDeleteItem();
  };
  return (
    <Card onClick={handleActiveItem} ref={cardRef}>
      <div className={cardWrapper}>
        {isActive && <div className={activeStyle} />}

        <div className={questionContainer}>
          <input
            className={questionInputTitle}
            placeholder="질문"
            onChange={handleItemsTitleChange}
            value={item.title}
          />
          <div className={selectBoxContainer}>
            <select
              className={selectBox}
              onChange={handleChangeItemType}
              defaultValue={'radio'}
            >
              <option value="textarea">단답형</option>
              <option value="radio">객관식</option>
              <option value="checkbox">체크박스</option>
              <option value="select">드롭다운</option>
            </select>
          </div>
        </div>
        <div className={optionContainer}>
          {item.type !== 'textarea' && (
            <>
              {item.options?.map((option, i) => (
                <div key={i} className={optionWrapper}>
                  {item.type === 'checkbox' && <Checkbox disabled />}
                  {item.type === 'radio' && <Radio disabled />}
                  {item.type === 'select' && <div>{`${i}.`}</div>}
                  <input
                    className={inputFocusStyle}
                    type="text"
                    placeholder={option.text}
                    onChange={(e) => handleOptionTextChange(e, i)}
                    value={option.text}
                  />
                </div>
              ))}
              <button className={optionAddButton} onClick={handleAddOptions}>
                옵션추가
              </button>
            </>
          )}
          {item.type === 'textarea' && (
            <div>
              <input placeholder="단답형 텍스트" disabled />
            </div>
          )}
        </div>
        <div className={itemFooterContainer}>
          <div className={itemFooterWrapper}>
            <button className={button} onClick={handleDeleteItem}>
              <svg width={23} height={23} viewBox="0 0 25 25">
                <g xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill={vars.color.grayScale500}
                    d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"
                  />
                </g>
              </svg>
            </button>
            <div className={bar} />
            <div className={required}>
              <span>필수</span>
              <input
                type="checkbox"
                checked={item.required}
                onChange={handleItemRequiredChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SurveyItem;
