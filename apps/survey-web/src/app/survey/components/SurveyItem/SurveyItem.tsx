import { Options } from '../../hooks/useSurvey';
import { Block, Card, Checkbox, Radio } from '@ssoon-servey/shared-ui';
import * as $ from './SurveyItem.css';
import { useSurveyFormContext } from '../../hooks/useSurveyFormContext';
import { validate } from '../../utils/validate';

const SurveyItem = ({
  title,
  itemId,
  type,
  options,
  isRequired,
}: {
  title: string;
  itemId: number;
  type: 'radio' | 'select' | 'checkbox';
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
  type: 'radio' | 'select' | 'checkbox';
  required: boolean;
  itemId: number;
}) => {
  const { surveyFormValue, onChangeForm } = useSurveyFormContext();
  const formValue = surveyFormValue?.[itemId]?.value;

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    onChangeForm({
      itemId,
      type,
      value,
      required,
      error: validate(type, value),
    });
  };
  return (
    <>
      {options.map((option) => (
        <div key={option.id} className={$.optionContainer}>
          <label className={$.optionWrapper}>
            <Radio
              value={option.option_text}
              name={option.option_text}
              checked={option.option_text === formValue}
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
  type: 'radio' | 'select' | 'checkbox';
  required: boolean;
  itemId: number;
}) => {
  const { surveyFormValue, onChangeForm } = useSurveyFormContext();
  const formValue = surveyFormValue?.[itemId]?.value;

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    const isError = checked ? false : validate(type, formValue);

    if (!formValue) {
      onChangeForm({
        itemId,
        type,
        required,
        value: [value],
        error: isError,
      });
      return;
    }
    if (typeof formValue === 'string') return;

    if (checked) {
      onChangeForm({
        itemId,
        type,
        required,
        value: [...formValue, value],
        error: isError,
      });
    } else {
      onChangeForm({
        itemId,
        type,
        required,
        value: formValue.filter((_value) => _value !== value),
        error: isError,
      });
    }
  };
  return (
    <>
      {options.map((option) => (
        <div key={option.id} className={$.optionContainer}>
          <label className={$.optionWrapper}>
            <Checkbox
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
  type: 'radio' | 'select' | 'checkbox';
  required: boolean;
  itemId: number;
}) => {
  const { surveyFormValue, onChangeForm } = useSurveyFormContext();
  const formValue = surveyFormValue?.[itemId]?.value ?? '';

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    onChangeForm({
      itemId,
      type,
      required,
      value,
      error: validate(type, value),
    });
  };

  return (
    <div className={$.selectBox}>
      <select
        className={$.select}
        value={formValue}
        onChange={handleChangeSelect}
      >
        <option value={''}>선택</option>
        {options.map((option) => (
          <option key={option.id} value={option.option_text}>
            {option.option_text}
          </option>
        ))}
      </select>
    </div>
  );
};
