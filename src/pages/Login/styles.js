import styled from 'styled-components';

export const MainContainer = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const FormSection = styled.section`
  background: #1E293B;
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #334155;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const FormHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;

  img {
    height: 4rem;
    width: auto;
  }

  h1 {
    font-size: 1.875rem;
    color: white;
  }

  p {
    font-size: 1rem;
    color: #94A3B8;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

  input {
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

export const FormSpan = styled.span`
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;

  a {
    color: #3b82f6;
    &:hover {
      text-decoration: underline;
    }
  }
`;