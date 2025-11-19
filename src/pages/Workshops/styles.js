import styled from 'styled-components';

export const ScreenContainer = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const FixedSection = styled.div`
  padding: 1.5rem 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-shrink: 0;
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 2rem;
  
  scrollbar-width: thin;
  scrollbar-color: #1E293B transparent;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1E293B;
    border-radius: 20px;
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

export const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const SearchInput = styled.input`
  background: #334155;
  color: #e5e7eb;
  border: 1px solid #475569;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  min-width: 250px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-right: 0.5rem; 

  &::placeholder {
    color: #94A3B8;
  }

  &:focus {
    outline: 2px solid #2563EB;
    border-color: transparent;
  }
`;

export const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid #475569;
  
  background-color: ${({ $isActive }) => $isActive ? '#2563EB' : 'transparent'};
  color: ${({ $isActive }) => $isActive ? '#FFF' : '#94A3B8'};
  border-color: ${({ $isActive }) => $isActive ? '#2563EB' : '#475569'};

  &:hover {
    background-color: ${({ $isActive }) => $isActive ? '#1D4ED8' : '#334155'};
  }
`;

export const EmptyStateContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #94A3B8;
  background: #1E293B;
  border-radius: 8px;
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  padding: 2rem;
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
`;

const getStatusColor = (status) => {
  switch (status) {
    case 'open': return '#16A34A';
    case 'full': return '#F59E0B';
    case 'closed': return '#DC2626';
    default: return '#64748B';
  }
};

export const StatusBadge = styled.span`
  padding: 4px 8px;
  background-color: ${({ $status }) => getStatusColor($status)};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 400;
  color: #FFF;
  text-transform: capitalize;
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