import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    color: white;
  }

  p {
    font-size: 1rem;
    color: #94A3B8;
  }
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

  input, select {
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

export const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: -0.75rem; 
`;