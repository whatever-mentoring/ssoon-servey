import { Options, usePostSurveyAnswers } from '../../hooks/api/useSurvey';
import { Block, Card, Checkbox, Radio } from '@ssoon-servey/shared-ui';
import * as $ from './SurveyItem.css';
import { useSurveyFormContext } from '../../hooks/useSurveyFormContext';
import { validate } from '../../utils/validate';
import usePageValue from '../../hooks/usePageValue';
import { useRef } from 'react';
import { itemsType } from '../../types/items.type';

const SurveyItem = ({
  title,
  itemId,
  type,
  options,
  isRequired,
}: {
  title: string;
  itemId: number;
  type: itemsType;
  options: Options[];
  isRequired: boolean;
}) => {
  const { surveyFormValue } = useSurveyFormContext();
  const isError = isRequired && surveyFormValue?.[itemId]?.error;
  return (
    <Card isError={isError}>
      <div className={$.cardWrapper}>
        <div className={$.itemTitle}>
          <span>{title}</span>
          {isRequired && <span className={$.asterisk}>*</span>}
        </div>
        <Block height={15} />
        <div>
          {type === 'radio' && (
            <RadioOptions
              options={options}
              itemId={itemId}
              type={type}
              required={isRequired}
            />
          )}
          {type === 'checkbox' && (
            <CheckboxOptions
              options={options}
              itemId={itemId}
              type={type}
              required={isRequired}
            />
          )}
          {type === 'select' && (
            <SelectOptions
              options={options}
              itemId={itemId}
              type={type}
              required={isRequired}
            />
          )}
          {type === 'textarea' && (
            <TextAreaOptions
              itemId={itemId}
              type={type}
              required={isRequired}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default SurveyItem;

const RadioOptions = ({
  options,
  type,
  required,
  itemId,
}: {
  options: Options[];
  type: itemsType;
  required: boolean;
  itemId: number;
}) => {
  const { surveyFormValue, onChangeForm } = useSurveyFormContext();
  const { surveyId } = usePageValue();
  const [mutate] = usePostSurveyAnswers();
  const formValue = surveyFormValue?.[itemId]?.value;
  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = e.currentTarget;
    onChangeForm({
      itemId,
      type,
      value: [value],
      required,
      error: validate(type, value),
    });

    mutate({ surveyId, itemId, optionsId: dataset.id as unknown as number });
  };
  return (
    <>
      {options.map((option) => (
        <div key={option.id} className={$.optionContainer}>
          <label className={$.optionWrapper}>
            <Radio
              data-id={option.id}
              value={option.option_text}
              name={option.option_text}
              checked={option.option_text === formValue?.[0]}
              onChange={handleChangeRadio}
            />
            <span>{option.option_text}</span>
          </label>
        </div>
      ))}
    </>
  );
};

const CheckboxOptions = ({
  options,
  type,
  required,
  itemId,
}: {
  options: Options[];
  type: itemsType;
  required: boolean;
  itemId: number;
}) => {
  const { surveyFormValue, onChangeForm } = useSurveyFormContext();
  const checkboxesRef = useRef<(HTMLInputElement | null)[]>([]);
  const { surveyId } = usePageValue();
  const [mutate] = usePostSurveyAnswers();
  const formValue = surveyFormValue?.[itemId]?.value;

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    const isError = checked ? false : validate(type, formValue);
    let checkboxValue = [];
    if (typeof formValue === 'string') return;
    if (!formValue) {
      checkboxValue = [value];
    } else if (checked) {
      checkboxValue = [...formValue, value];
    } else {
      checkboxValue = formValue.filter((_value) => _value !== value);
    }
    onChangeForm({
      itemId,
      type,
      required,
      value: checkboxValue,
      error: isError,
    });

    const checkedOptionIds = checkboxesRef.current.reduce(
      (optionIds, checkbox) => {
        if (checkbox?.checked) {
          optionIds.push(checkbox?.dataset.id as unknown as number);
        }
        return optionIds;
      },
      [] as number[]
    );

    mutate({ surveyId, itemId, optionsId: checkedOptionIds });
  };
  return (
    <>
      {options.map((option, i) => (
        <div key={option.id} className={$.optionContainer}>
          <label className={$.optionWrapper}>
            <Checkbox
              ref={(el) => (checkboxesRef.current[i] = el)}
              data-id={option.id}
              value={option.option_text}
              name={option.option_text}
              checked={formValue?.includes(option.option_text)}
              onChange={handleChangeCheck}
            />
            <span>{option.option_text}</span>
          </label>
        </div>
      ))}
    </>
  );
};

const SelectOptions = ({
  options,
  type,
  required,
  itemId,
}: {
  options: Options[];
  type: itemsType;
  required: boolean;
  itemId: number;
}) => {
  const { surveyFormValue, onChangeForm } = useSurveyFormContext();
  const { surveyId } = usePageValue();
  const [mutate] = usePostSurveyAnswers();
  const formValue = surveyFormValue?.[itemId]?.value;

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, selectedOptions } = e.currentTarget;
    onChangeForm({
      itemId,
      type,
      required,
      value: [value],
      error: validate(type, value),
    });
    mutate({
      surveyId,
      itemId,
      optionsId: selectedOptions[0].dataset.id as unknown as number,
    });
  };

  return (
    <div className={$.selectBox}>
      <select
        className={$.select}
        value={formValue?.[0] ?? ''}
        onChange={handleChangeSelect}
      >
        <option value={''}>선택</option>
        {options.map((option) => (
          <option
            data-id={option.id}
            key={option.id}
            value={option.option_text}
          >
            {option.option_text}
          </option>
        ))}
      </select>
    </div>
  );
};

const TextAreaOptions = ({
  type,
  required,
  itemId,
}: {
  type: itemsType;
  required: boolean;
  itemId: number;
}) => {
  const { surveyFormValue, onChangeForm } = useSurveyFormContext();
  const { surveyId } = usePageValue();
  const [mutate] = usePostSurveyAnswers();
  const formValue = surveyFormValue?.[itemId]?.value;

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    onChangeForm({
      itemId,
      type,
      required,
      value: [value],
      error: validate(type, value),
    });
    mutate({
      surveyId,
      itemId,
      text: value,
    });
  };

  return (
    <div>
      <textarea
        className={$.textArea}
        rows={1}
        onChange={handleChangeInput}
        value={formValue?.[0] ?? ''}
      />
    </div>
  );
};
