import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem; 
`;

export const ModalContent = styled.div`
  background: #1E293B;
  padding: 0; 
  border-radius: 1rem;
  border: 1px solid #334155;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 32rem;
  position: relative;

  display: flex;
  flex-direction: column;
  max-height: 90vh; 
  overflow: hidden; 
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1.5rem;
  color: #94A3B8;
  line-height: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 20; 

  &:hover {
    color: #FFF;
  }
`;