import styled, { css } from 'styled-components';

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

export const TableContainer = styled.div`
  background-color: #1E293B; 
  border-radius: 8px;
  overflow: hidden; 
  border: 1px solid #475569;
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse; 

  th, td {
    text-align: left;
    padding: 1rem 1.5rem;
  }

  thead {
    background: #334155;
    th {
      font-weight: 600;
      font-size: 0.875rem;
      color: #CBD5E1;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #475569;
      &:last-child {
        border-bottom: none;
      }
    }

    td {
      color: #FFF;
    }
  }
`;

const getBadgeStyles = ({ $status, $type }) => {
  if ($type) {
    return css`background-color: #2563eb;`;
  }
  if ($status === 'active') {
    return css`background-color: #16A34A;`;
  }
  if ($status === 'inactive') {
    return css`background-color: #ef4444;`;
  }
  return css``;
};

export const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  text-transform: capitalize;
  color: #ffffff;
  ${(props) => getBadgeStyles(props)}
`;

export const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  font-weight: 500;
  font-size: 0.875rem;
  transition: opacity 0.2s ease;
  padding: 0.5rem;
  color: ${({ variant }) => (variant === 'edit' ? '#2563EB' : '#FACC15')};

  &:hover {
    opacity: 0.8;
  }
`;