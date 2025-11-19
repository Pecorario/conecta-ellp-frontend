import { Routes, Route } from 'react-router-dom';
import GlobalStyles from "./styles/GlobalStyles";
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import WorkshopsPage from '@/pages/Workshops';
import UsersPage from '@/pages/Users';
import WorkshopDetailsPage from '@/pages/WorkshopDetails';
import DocumentsPage from '@/pages/Documents';
import ProfilePage from '@/pages/Profile';
import NotFoundPage from '@/pages/NotFound'; 
import ProtectedRoute from '@/components/ProtectedRoute';
import GuestRoute from '@/components/GuestRoute';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isSessionLoading } = useAuth();
  const { isLoading } = useLoading();

  return (
    <>
      <GlobalStyles />
      {(isSessionLoading || isLoading) && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<WorkshopsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            
            <Route element={<RoleProtectedRoute allowedRoles={['admin', 'teacher', 'tutor']} />}>
              <Route path="workshops/:id" element={<WorkshopDetailsPage />} />
            </Route>
            
            <Route element={<RoleProtectedRoute allowedRoles={['admin', 'teacher']} />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="documents" element={<DocumentsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />

          </Route>
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;