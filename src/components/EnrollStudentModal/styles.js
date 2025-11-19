import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  flex-shrink: 0;
  padding: 2rem 2rem 1rem 2rem;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin: 0;
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  scrollbar-width: thin;
  scrollbar-color: #334155 transparent;
  
  &::-webkit-scrollbar { 
    width: 6px; 
  }

  &::-webkit-scrollbar-track { 
    background: transparent; 
  }

  &::-webkit-scrollbar-thumb { 
    background-color: #334155; 
    border-radius: 20px; 
  }
`;

export const ModalFooter = styled.div`
  flex-shrink: 0;
  padding: 1rem 2rem 2rem 2rem;
  background-color: #1E293B;
  border-top: 1px solid #334155;
  display: flex;
  justify-content: flex-end; 
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label { 
    font-size: 0.875rem;
    font-weight: 500;
    color: #CBD5E1;
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;