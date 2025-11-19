import React from 'react';

import * as S from './styles.js';

function Button({ children, variant, type = 'button', ...props }) {
  return (
    <S.StyledButton variant={variant} type={type} {...props}>
      {children}
    </S.StyledButton>
  );
}

export default Button;