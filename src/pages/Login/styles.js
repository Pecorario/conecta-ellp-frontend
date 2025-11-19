import styled from 'styled-components';

export const MainContainer = styled.main`
  width: 100%;
  height: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden; 
`;

export const FormSection = styled.section`
  background: #1E293B;
  width: 100%;
  max-width: 28rem;
  border-radius: 1rem;
  border: 1px solid #334155;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  padding: 0; 
  overflow: hidden; 
`;

export const FormHeader = styled.header`
  flex-shrink: 0; 
  padding: 2rem 2rem 1rem 2rem; 
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  width: 100%;

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
  flex: 1; 
  overflow: hidden; 
`;

export const ScrollableInputs = styled.div`
  flex: 1; 
  overflow-y: auto; 
  padding: 0 2rem 2rem 2rem; 
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
    border: 1px solid transparent;
  }
`;

export const FormFooter = styled.div`
  flex-shrink: 0; 
  padding: 1rem 2rem 2rem 2rem; 
  background-color: #1E293B; 
  border-top: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 10;
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

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    padding-right: 2.5rem;
  }

  button {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #94A3B8;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    &:hover {
      color: #FFF;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 0.875rem;
`;