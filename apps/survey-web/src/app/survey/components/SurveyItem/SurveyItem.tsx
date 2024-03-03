import { Options } from '../../hooks/useSurvey';
import { Block, Card, Checkbox, Radio } from '@ssoon-servey/shared-ui';
import * as $ from './SurveyItem.css';

const SurveyItem = ({
  title,
  type,
  options,
  isRequired,
}: {
  title: string;
  type: 'radio' | 'select' | 'checkbox';
  options: Options[];
  isRequired: boolean;
}) => {
  return (
    <Card>
      <div className={$.cardWrapper}>
        <div className={$.itemTitle}>
          <span>{title}</span>
          {isRequired && <span className={$.asterisk}>*</span>}
        </div>
        <Block height={15} />
        <div>
          {type === 'radio' && <RadioOptions options={options} />}
          {type === 'checkbox' && <CheckboxOptions options={options} />}
          {type === 'select' && <SelectOptions options={options} />}
        </div>
      </div>
    </Card>
  );
};

export default SurveyItem;

const RadioOptions = ({ options }: { options: Options[] }) => {
  return (
    <>
      {options.map((option) => (
        <div key={option.id} className={$.optionContainer}>
          <label className={$.optionWrapper}>
            <Radio value={option.option_text} name={option.option_text} />
            <span>{option.option_text}</span>
          </label>
        </div>
      ))}
    </>
  );
};

const CheckboxOptions = ({ options }: { options: Options[] }) => {
  return (
    <>
      {options.map((option) => (
        <div key={option.id} className={$.optionContainer}>
          <label className={$.optionWrapper}>
            <Checkbox value={option.option_text} name={option.option_text} />
            <span>{option.option_text}</span>
          </label>
        </div>
      ))}
    </>
  );
};

const SelectOptions = ({ options }: { options: Options[] }) => {
  return (
    <div className={$.selectBox}>
      <select className={$.select} value={undefined}>
        <option value={undefined}>선택</option>
        {options.map((option) => (
          <option key={option.id} value={option.option_text}>
            {option.option_text}
          </option>
        ))}
      </select>
    </div>
  );
};
