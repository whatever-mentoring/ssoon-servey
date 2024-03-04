import React from 'react';
import { card } from './Card.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { vars } from '../../global.css';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  isError?: boolean;
}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, onClick, isError }, ref) => {
    return (
      <div
        className={card}
        style={assignInlineVars({
          border: isError ? `1px solid ${vars.color.red500}` : 'none',
        })}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export default Card;
