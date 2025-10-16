import styled from 'styled-components';

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #CBD5E1;
  }

  select {
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
`;