import React from 'react';

import * as S from './styles.js';

function Loader() {
  return (
    <S.LoaderOverlay>
      <S.Spinner />
    </S.LoaderOverlay>
  );
}

export default Loader;