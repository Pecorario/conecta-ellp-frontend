import { Routes, Route } from 'react-router-dom';
import GlobalStyles from "./styles/GlobalStyles";
import Layout from './components/Layout';

import * as S from './App.styles'

const LoginPage = () => (<S.MainContent><h1>Página de Login</h1></S.MainContent>);
const WorkshopsPage = () => (<S.MainContent><h1>Página de Oficinas</h1></S.MainContent>);
const UsersPage = () => (<S.MainContent><h1>Página de Usuários</h1></S.MainContent>);
const CertificatesPage = () => (<S.MainContent><h1>Página de Certificados</h1></S.MainContent>);

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WorkshopsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="certificados" element={<CertificatesPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;