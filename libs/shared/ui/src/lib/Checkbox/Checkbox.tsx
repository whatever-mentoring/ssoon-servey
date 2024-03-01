import { checkbox } from './Checkbox.css';

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={checkbox} type="checkbox" {...props} />;
};

export default Checkbox;
