import styled from 'styled-components';

export const ScreenContainer = styled.main`
  flex: 1;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #1E293B transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1E293B;
    border-radius: 20px;
    border: 1px solid transparent;
  }
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

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: stretch;
  gap: 2rem;
`;

export const WorkshopCard = styled.article`
  flex: 1;
  min-width: 320px;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #1E293B;
  border: 1px solid #475569;
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #FFF;
  }

  span {
    padding: 4px 8px;
    background: #16A34A;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 400;
    color: #FFF;
    text-transform: capitalize;
  }
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #94A3B8;
`;

export const CardInfo = styled.div`
  margin-top: auto; 
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  span {
    font-size: 0.875rem;
    font-weight: 400;
    color: #94A3B8;
  }

  p {
    font-size: 0.875rem;
    font-weight: 400;
    color: #FFF;
  }
`;