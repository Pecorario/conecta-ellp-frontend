import styled from 'styled-components';

export const ScreenContainer = styled.main`
  flex: 1;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
`;

export const DetailsHeader = styled.header`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #334155;

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

export const DetailsContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
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
  gap: 1rem;
`;

export const StudentListItem = styled.li`
  label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: #E0E4E8;
    cursor: pointer;
  }

  input[type="checkbox"] {
    width: 1.15em;
    height: 1.15em;
    cursor: pointer;
  }
`;