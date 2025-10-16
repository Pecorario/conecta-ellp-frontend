import { Routes, Route } from 'react-router-dom';
import GlobalStyles from "./styles/GlobalStyles";
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import ProtectedRoute from '@/components/ProtectedRoute';
import GuestRoute from '@/components/GuestRoute';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';

const WorkshopsPage = () => <h1>Página de Oficinas</h1>;
const UsersPage = () => <h1>Página de Usuários</h1>;
const CertificatesPage = () => <h1>Página de Certificados</h1>;

function App() {
  const { isSessionLoading } = useAuth();
  const { isLoading } = useLoading();

  return (
    <>
      <GlobalStyles />
      {(isSessionLoading || isLoading) && <Loader />}
      
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<WorkshopsPage />} />
            
            <Route element={<RoleProtectedRoute allowedRoles={['admin', 'teacher']} />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="certificados" element={<CertificatesPage />} />
            </Route>

          </Route>
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;