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
    background-color: #334155;
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

export const EmptyStateContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #94A3B8;
`;

export const TableContainer = styled.div`
  background-color: #1E293B; 
  border-radius: 8px;
  overflow: hidden; 
  border: 1px solid #475569;

  ${({ $hasPagination }) => $hasPagination && css`
    border-radius: 8px 8px 0 0;
    border-bottom: none;
  `}
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse; 

  th, td {
    text-align: left;
    padding: 1rem;
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

      transition: background-color 0.2s;

      &:hover {
        background-color: #334155;
      }
    }

    td {
      color: #FFF;
    }
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      position: relative;
      cursor: pointer;
    }

    td:not(.primary-info) {
      display: none;
    }

    tr.expanded td {
      display: block;
      padding: 0.5rem 0;
      border: none;
    }

    td.primary-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0;
    }

    tr.expanded td:not(.primary-info)::before {
      content: attr(data-label);
      display: block;
      font-size: 0.75rem;
      color: #94A3B8;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    td:last-child {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: block !important; 
      padding: 0;
    }
  }
`;

export const PrimaryInfoName = styled.span`
  font-weight: 600;
  color: #FFF;
  display: block;
`;

export const PrimaryInfoEmail = styled.span`
  font-size: 0.875rem;
  color: #94A3B8;
  display: block;
`;

const getBadgeStyles = ({ $status, $type }) => {
  if ($type) return css`background-color: #2563eb;`;
  if ($status === 'active') return css`background-color: #16A34A;`;
  if ($status === 'inactive') return css`background-color: #ef4444;`;
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
  justify-content: flex-start;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  & > div {
    min-width: 200px;
    }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #1E293B;
  border-radius: 0 0 8px 8px;
  border: 1px solid #475569;
  border-top: none; 

  p {
    color: #94A3B8;
    font-size: 0.875rem;
  }

  div {
    display: flex;
    gap: 0.5rem;
  }
`;

export const SearchInput = styled.input`
  background: #334155;
  color: #e5e7eb;
  border: 1px solid #475569;
  border-radius: 4px;
  padding: 0.45rem 1rem;
  min-width: 250px;
  font-size: 1rem;
  
  &::placeholder { 
    color: #94A3B8; 
  }

  &:focus {
    outline: 2px solid #2563EB; border-color: transparent; 
  }
`;