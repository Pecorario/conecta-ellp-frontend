import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import * as S from './styles.js';

function Layout() {
  return (
    <S.LayoutContainer>
      <Header />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
      <Footer />
    </S.LayoutContainer>
  );
}

export default Layout;