import styled, { keyframes } from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const slideUpAndFade = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const IconButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  transition: all 0.2s;

  &:hover {
    background-color: #334155;
    color: #FFF;
  }
  
  font-size: 1.25rem;
`;

export const Content = styled(DropdownMenu.Content)`
  min-width: 160px;
  background-color: #1E293B;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  border: 1px solid #334155;
  animation: ${slideUpAndFade} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 50; 
`;

export const Item = styled(DropdownMenu.Item)`
  font-size: 0.875rem;
  line-height: 1;
  color: #E2E8F0;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  outline: none;
  gap: 0.5rem;

  &[data-highlighted] {
    background-color: #2563EB;
    color: white;
  }

  &.delete {
    color: #EF4444;
    &[data-highlighted] {
      background-color: #EF4444;
      color: white;
    }
  }
`;