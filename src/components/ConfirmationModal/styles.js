import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
`;

export const Header = styled.div`
  padding-right: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #FFF;
    margin: 0;
    line-height: 1.2;
  }
`;

export const Message = styled.p`
  font-size: 1rem;
  color: #CBD5E1;
  line-height: 1.6;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  
  @media (min-width: 640px) {
    width: auto;
  }

  button {
    min-width: 100px;
  }
`;