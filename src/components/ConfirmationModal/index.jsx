import React from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

import * as S from './styles.js';

function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirmar', 
  cancelText = 'Cancelar',
  confirmVariant = 'danger'
}) {
  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <S.Container>
        <S.Header>
          <h2>{title}</h2>
        </S.Header>
        
        <S.Message>
          {message}
        </S.Message>

        <S.Footer>
          <S.ButtonGroup>
            <Button variant="tertiary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant={confirmVariant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </S.ButtonGroup>
        </S.Footer>
      </S.Container>
    </Modal>
  );
}

export default ConfirmationModal;