import React from 'react';
import { checkbox } from './Checkbox.css';

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input ref={ref} className={checkbox} type="checkbox" {...props} />;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
