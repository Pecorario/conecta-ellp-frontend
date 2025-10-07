import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: #1E293B;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  border-top: 1px solid #e5e7eb1d;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  p {
    font-size: 1rem;
    color: #9ca3af;
  }

  span {
    font-size: 0.875rem;
    color: #9ca3af;
  }
`;