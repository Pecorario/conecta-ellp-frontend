import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  background: #1E293B;
  padding: 0 1.5rem;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #475569;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    height: 2.625rem;
    width: auto;
  }
`;

export const HeaderLeftText = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFF;
  }

  span {
    font-size: 0.875rem;
    font-weight: 400;
    color: #94A3B8;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    font-size: 1rem;
    font-weight: 500;
    color: #94A3B8;
  }
`;

export const NavContainer = styled.nav`
  background: #1E293B;
  padding: 0 2rem;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #475569;
  position: sticky;
  top: 5rem;
  left: 0;
  z-index: 100;
`;

export const NavList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 2rem;
`;

const activeNavItemStyle = css`
  box-shadow: 0 2px 0 0 #2563EB;
`;

export const NavItem = styled.li`
  height: calc(100% - 2px);
  padding: 0 1rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  a {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 0.875rem;
    font-weight: 500;
    color: #FFF;
    text-decoration: none;
  }

  &:hover {
    ${activeNavItemStyle}
  }

  ${(props) => props.$isActive && activeNavItemStyle}
`;