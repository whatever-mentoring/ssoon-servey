import React from 'react';

interface Props extends React.ComponentProps<'div'> {
  height: number;
}

const Block = (props: Props) => {
  const { height, children } = props;

  return (
    <div {...props} style={{ height }}>
      {children}
    </div>
  );
};

export default Block;
