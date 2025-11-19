import styled, { css } from 'styled-components';

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

export const DetailsHeader = styled.header`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #334155;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const HeaderInfo = styled.div`
  h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #FFF;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
    color: #94A3B8;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;

  & > button {
    height: 38px;
    width: 38px;
    padding: 0.625rem;
    width: auto;
    
    svg {
      margin: 0; 
    }
  }

  .icon-button {
    width: 38px;
    font-size: 1rem;
  }
`;

export const DetailsContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    font-size: 1rem;
    color: #FFF;
  }
`;

export const AttendanceSection = styled.section`
  background: #1E293B;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const AttendanceTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFF;
  padding-bottom: 1rem;
  border-bottom: 1px solid #334155;
`;

export const StudentList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
`;

export const StudentListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #334155;
  }
`;

export const StudentName = styled.span`
  font-size: 1rem;
  color: #E0E4E8;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const PresenceButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;

  ${({ $isPresent }) =>
    $isPresent
      ? css`background-color: #16A34A; color: #FFF;`
      : css`background-color: #334155; color: #94A3B8;`}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 0.875rem;
  }
`;

export const RemoveButton = styled.button`
  font-size: 1.125rem; 
  padding: 0.5rem;
  transition: color 0.2s ease;

  &:hover svg {
    fill: #fc4343ff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    fill: #94A3B8;
    display: block;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 1rem;
`;