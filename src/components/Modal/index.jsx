import React from 'react';

import * as S from './styles.js';

function Modal({ isOpen, handleClose, children }) {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalContent>
        <S.CloseButton onClick={handleClose} title="Fechar">
          &times;
        </S.CloseButton>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default Modal;