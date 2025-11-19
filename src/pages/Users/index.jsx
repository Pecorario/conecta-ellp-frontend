import React, { useState, useEffect, useMemo } from 'react';
import api from '@/services/api.js';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import UserForm from '@/components/UserForm';
import ConfirmationModal from '@/components/ConfirmationModal';
import ActionMenu, { ActionMenuItem } from '@/components/ActionMenu';
import { useLoading } from '@/hooks/useLoading.js';
import * as S from './styles.js';
import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Select from 'react-select';
import { darkSelectStyles } from '@/styles/selectStyles.js';

const ITEMS_PER_PAGE = 10;

const typeOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'teacher', label: 'Professor' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'student', label: 'Aluno' },
];

const statusOptions = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
];

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); 
  
  const { showLoader, hideLoader, isLoading } = useLoading();

  const [filterType, setFilterType] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      showLoader();
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError('Não foi possível carregar a lista de usuários.');
      } finally {
        hideLoader();
      }
    }
    fetchUsers();
  }, [showLoader, hideLoader]);

  const paginatedUsers = useMemo(() => {
    const filtered = users.filter(user => {
      const selectedTypes = filterType.map(option => option.value);
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(user.type);
      
      const selectedStatuses = filterStatus.map(option => option.value);
      const matchStatus = selectedStatuses.length === 0 || selectedStatuses.includes(user.status);
      
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = user.name.toLowerCase().includes(searchLower) || 
                          user.email.toLowerCase().includes(searchLower);

      return matchType && matchStatus && matchSearch;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return {
      filteredCount: filtered.length,
      data: filtered.slice(startIndex, endIndex)
    };
  }, [users, filterType, filterStatus, searchTerm, currentPage]);

  const totalPages = Math.ceil(paginatedUsers.filteredCount / ITEMS_PER_PAGE);
  const showPagination = totalPages > 1;

  const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));

  const handleTypeFilterChange = (selectedOptions) => { setFilterType(selectedOptions); setCurrentPage(1); };
  const handleStatusFilterChange = (selectedOptions) => { setFilterStatus(selectedOptions); setCurrentPage(1); };
  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };

  const handleUpdateUserStatus = async (userId, newStatus) => {
    showLoader();
    try {
      const endpoint = newStatus === 'active' ? `/users/activate/${userId}` : `/users/deactivate/${userId}`;
      const response = await api.post(endpoint);
      const updatedUser = response.data;
      setUsers(currentUsers => currentUsers.map(user => user._id === userId ? updatedUser : user));
      toast.success('Status do usuário atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar status.');
    } finally {
      hideLoader();
    }
  };
  
  const handleDeleteClick = (user) => { setUserToDelete(user); };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    showLoader();
    try {
      await api.delete(`/users/${userToDelete._id}`);
      setUsers(currentUsers => currentUsers.filter(user => user._id !== userToDelete._id));
      toast.success('Usuário removido com sucesso!');
      setUserToDelete(null);
    } catch (err) {
      toast.error('Erro ao remover usuário.');
    } finally {
      hideLoader();
    }
  };

  const handleCreateUserSuccess = (newUser) => { setUsers(currentUsers => [...currentUsers, newUser]); setIsCreateModalOpen(false); toast.success('Usuário criado com sucesso!'); };
  const handleEditUserSuccess = (updatedUser) => { setUsers(currentUsers => currentUsers.map(user => user._id === updatedUser._id ? updatedUser : user)); setIsEditModalOpen(false); setUserToEdit(null); toast.success('Usuário atualizado com sucesso!'); };
  
  const handleOpenCreateModal = () => { setUserToEdit(null); setIsCreateModalOpen(true); };
  const handleOpenEditModal = (user) => { setUserToEdit(user); setIsEditModalOpen(true); };
  const handleCloseEditModal = () => { setIsEditModalOpen(false); setUserToEdit(null); };

  const toggleRow = (userId) => {
    if (window.innerWidth <= 768) {
      setExpandedUserId(expandedUserId === userId ? null : userId);
    }
  };

  if (error) return <S.ScreenContainer><p style={{ color: '#ef4444', padding: '2rem' }}>{error}</p></S.ScreenContainer>;

  return (
    <S.ScreenContainer>
      <S.FixedSection>
        <S.ScreenTitle>
          <h1>Usuários</h1>
          <Button variant="primary" onClick={handleOpenCreateModal}>+ Novo Usuário</Button>
        </S.ScreenTitle>

        <S.FilterContainer>
          <S.SearchInput 
            type="text" 
            placeholder="Buscar por nome ou e-mail..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div><Select isMulti options={typeOptions} styles={darkSelectStyles} value={filterType} onChange={handleTypeFilterChange} placeholder="Filtrar por tipo..." menuPortalTarget={document.body} /></div>
          <div><Select isMulti options={statusOptions} styles={darkSelectStyles} value={filterStatus} onChange={handleStatusFilterChange} placeholder="Filtrar por status..." menuPortalTarget={document.body} /></div>
        </S.FilterContainer>
      </S.FixedSection>

      <S.ScrollableContent>
        <S.TableContainer $hasPagination={showPagination}>
          {!isLoading && paginatedUsers.filteredCount === 0 ? (
            <S.EmptyStateContainer>
              <p>Nenhum usuário encontrado com os filtros selecionados.</p>
            </S.EmptyStateContainer>
          ) : (
            <S.UserTable>
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.data.map(user => (
                  <tr 
                    key={user._id} 
                    className={expandedUserId === user._id ? 'expanded' : ''}
                    onClick={() => toggleRow(user._id)}
                  >
                    <td className="primary-info">
                      <S.PrimaryInfoName>{user.name}</S.PrimaryInfoName>
                      <S.PrimaryInfoEmail>{user.email}</S.PrimaryInfoEmail>
                    </td>
                    
                    <td data-label="Tipo">
                      <S.Badge $type>{user.type}</S.Badge>
                    </td>
                    
                    <td data-label="Status">
                      <S.Badge $status={user.status}>{user.status}</S.Badge>
                    </td>

                    <td onClick={(e) => e.stopPropagation()}>
                      <ActionMenu>
                        <ActionMenuItem onClick={() => handleOpenEditModal(user)}>
                          <FaEdit /> Editar
                        </ActionMenuItem>
                        
                        {user.status === 'active' ? (
                          <ActionMenuItem onClick={() => handleUpdateUserStatus(user._id, 'inactive')}>
                            <FaToggleOn /> Desativar
                          </ActionMenuItem>
                        ) : (
                          <ActionMenuItem onClick={() => handleUpdateUserStatus(user._id, 'active')}>
                            <FaToggleOff /> Ativar
                          </ActionMenuItem>
                        )}
                        
                        <ActionMenuItem className="delete" onClick={() => handleDeleteClick(user)}>
                          <FaTrashAlt /> Apagar
                        </ActionMenuItem>
                      </ActionMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.UserTable>
          )}
        </S.TableContainer>

        {showPagination && (
          <S.PaginationContainer>
            <p>Página {currentPage} de {totalPages}</p>
            <div>
              <Button variant="tertiary" onClick={goToPreviousPage} disabled={currentPage === 1}>Anterior</Button>
              <Button variant="tertiary" onClick={goToNextPage} disabled={currentPage === totalPages}>Próxima</Button>
            </div>
          </S.PaginationContainer>
        )}
      </S.ScrollableContent>

      <Modal isOpen={isCreateModalOpen} handleClose={() => setIsCreateModalOpen(false)}>
        <UserForm onSuccess={handleCreateUserSuccess} />
      </Modal>
      {userToEdit && (
        <Modal isOpen={isEditModalOpen} handleClose={handleCloseEditModal}>
          <UserForm onSuccess={handleEditUserSuccess} userToEdit={userToEdit} />
        </Modal>
      )}
      <ConfirmationModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDeleteUser}
        title="Apagar Usuário"
        message={`Tem certeza que deseja apagar o usuário "${userToDelete?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Apagar"
        confirmVariant="danger"
      />
    </S.ScreenContainer>
  );
}

export default UsersPage;