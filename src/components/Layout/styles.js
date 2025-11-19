import styled from 'styled-components';

export const LayoutContainer = styled.div`
  height: 100vh; 
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #0F172A;
`;

export const MainContent = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  overflow: hidden; 
  position: relative;
  
  & > main {
    flex: 1;
    overflow-y: auto; 
  }
`;