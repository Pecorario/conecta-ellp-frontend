import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';

import Button from '@/components/Button';

import * as S from './styles.js';

function NavItemLink({ to, children, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <S.NavItem $isActive={!!match}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </S.NavItem>
  );
}

function Header() {
  const { user, handleLogout } = useAuth();
  
  if (!user) {
    return null;
  }
  
  const typesMap = {
    admin: 'Administrador',
    tutor: 'Tutor',
    student: 'Aluno',
    teacher: 'Professor'
  };
  const userTypeFormatted = typesMap[user.type] || 'Usuário';

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderLeft>
          <img src="/images/logo.svg" alt="Logo" />
          <S.HeaderLeftText>
            <p>ConectaELLP</p>
            <span>{userTypeFormatted}</span>
          </S.HeaderLeftText>
        </S.HeaderLeft>
        <S.HeaderRight>
          <span>{user.name}</span>
          <Button variant="tertiary" onClick={handleLogout}>
            Sair
          </Button>
        </S.HeaderRight>
      </S.HeaderContainer>

      <S.NavContainer>
        <S.NavList>
          <NavItemLink to="/">Oficinas</NavItemLink>
          
          {(user.type === 'teacher' || user.type === 'admin') && (
            <>
              <NavItemLink to="/users">Usuários</NavItemLink>
              <NavItemLink to="/documents">Documentos</NavItemLink>
            </>
          )}

          <NavItemLink to="/profile">Meu Perfil</NavItemLink>

        </S.NavList>
      </S.NavContainer>
    </>
  );
}

export default Header;