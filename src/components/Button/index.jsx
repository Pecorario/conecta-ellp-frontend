import React from 'react';
import * as S from './styles.js';

function Button({ children, variant, ...props }) {
  return (
    <S.StyledButton variant={variant} {...props}>
      {children}
    </S.StyledButton>
  );
}

export default Button;