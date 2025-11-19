import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  width: 100%;
`;

export const FormHeader = styled.header`
  flex-shrink: 0;
  padding: 2rem 2rem 1rem 2rem;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #94A3B8;
  }
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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

  input, textarea {
    background: #334155;
    color: #e5e7eb;
    border-radius: 8px;
    border: 1px solid #475569;
    padding: 0.625rem 0.75rem;
    width: 100%;

    &:focus {
      outline: 2px solid #2563EB;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;