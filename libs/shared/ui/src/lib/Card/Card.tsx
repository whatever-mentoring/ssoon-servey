import React from 'react';
import { card } from './Card.css';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, onClick },ref) => {
    return (
      <div className={card} onClick={onClick} ref={ref}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export default Card;
