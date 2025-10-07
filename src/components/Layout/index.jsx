import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import * as S from '../../App.styles.js';

function Layout() {
  return (
    <>
      <Header />
      
      <S.MainContent>
        <Outlet />
      </S.MainContent>

      <Footer />
    </>
  );
}

export default Layout;