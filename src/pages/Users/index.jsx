import React, { useState, useEffect } from 'react';
import api from '@/services/api.js';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import UserForm from '@/components/UserForm';
import { useLoading } from '@/hooks/useLoading.js';
import * as S from './styles.js';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    async function fetchUsers() {
      showLoader();
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError('Não foi possível carregar a lista de usuários.');
        console.error('Erro ao buscar usuários:', err);
      } finally {
        hideLoader();
      }
    }

    fetchUsers();
  }, [showLoader, hideLoader]);

  const handleUpdateUserStatus = async (userId, newStatus) => {
    showLoader();
    try {
      const endpoint = newStatus === 'active' ? `/users/activate/${userId}` : `/users/deactivate/${userId}`;
      const response = await api.post(endpoint);
      const updatedUser = response.data;

      setUsers(currentUsers => 
        currentUsers.map(user => 
          user._id === userId ? updatedUser : user
        )
      );
    } catch (err) {
      console.error(`Erro ao ${newStatus === 'active' ? 'ativar' : 'desativar'} usuário:`, err);
    } finally {
      hideLoader();
    }
  };
  
  const handleCreateUserSuccess = (newUser) => {
    setUsers(currentUsers => [...currentUsers, newUser]);
    setIsCreateModalOpen(false);
  };

  const handleEditUserSuccess = (updatedUser) => {
    setUsers(currentUsers => 
      currentUsers.map(user => 
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setIsEditModalOpen(false); 
    setUserToEdit(null); 
  };

  const handleOpenCreateModal = () => {
    setUserToEdit(null); 
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setUserToEdit(null);
  };


  if (error) {
    return (
      <S.ScreenContainer>
        <p style={{ color: '#ef4444' }}>{error}</p>
      </S.ScreenContainer>
    );
  }

  return (
    <S.ScreenContainer>
      <S.ScreenTitle>
        <h1>Usuários</h1>
        <Button variant="primary" onClick={handleOpenCreateModal}>+ Novo Usuário</Button>
      </S.ScreenTitle>

      <S.TableContainer>
        <S.UserTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <S.Badge $type>{user.type}</S.Badge>
                </td>
                <td>
                  <S.Badge $status={user.status}>{user.status}</S.Badge>
                </td>
                <td>
                  <S.ActionsCell>
                    <S.ActionButton variant="edit" onClick={() => handleOpenEditModal(user)}>Editar</S.ActionButton>
                    {user.status === 'active' ? (
                      <S.ActionButton variant="status" onClick={() => handleUpdateUserStatus(user._id, 'inactive')}>
                        Desativar
                      </S.ActionButton>
                    ) : (
                      <S.ActionButton variant="status" onClick={() => handleUpdateUserStatus(user._id, 'active')}>
                        Ativar
                      </S.ActionButton>
                    )}
                  </S.ActionsCell>
                </td>
              </tr>
            ))}
          </tbody>
        </S.UserTable>
      </S.TableContainer>

      <Modal isOpen={isCreateModalOpen} handleClose={() => setIsCreateModalOpen(false)}>
        <UserForm onSuccess={handleCreateUserSuccess} />
      </Modal>

      {userToEdit && ( 
        <Modal isOpen={isEditModalOpen} handleClose={handleCloseEditModal}>
          <UserForm onSuccess={handleEditUserSuccess} userToEdit={userToEdit} />
        </Modal>
      )}

    </S.ScreenContainer>
  );
}

export default UsersPage;