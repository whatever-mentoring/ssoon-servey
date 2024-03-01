import { radio } from './Radio.css';

const Radio = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={radio} type="radio" {...props} />;
};

export default Radio;
