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
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFF;
  }
`;

export const ContentContainer = styled.div`
  background: #1E293B;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #E0E4E8;
  padding-bottom: 1rem;
  border-bottom: 1px solid #334155;
`;

export const VolunteerList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

export const VolunteerListItem = styled.li`
  label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: #E0E4E8;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #334155;
    }
  }

  input[type="checkbox"] {
    width: 1.15em;
    height: 1.15em;
    cursor: pointer;
  }
`;

export const ActionsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;