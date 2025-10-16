import styled from 'styled-components';

export const ScreenContainer = styled.main`
  flex: 1;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
`;

export const ScreenTitle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFF;
  }
`;

export const Content = styled.div`
  background: #1E293B;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 2rem;
  color: #94A3B8;
  text-align: center;
`;