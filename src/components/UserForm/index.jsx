import React, { useState, useEffect } from 'react';
import api from '@/services/api.js';
import { useAuth } from '@/hooks/useAuth.js';
import { useLoading } from '@/hooks/useLoading.js';
import Button from '@/components/Button';
import * as S from './styles.js';

function UserForm({ onSuccess, userToEdit }) {
  const { user: loggedInUser } = useAuth();
  const { isLoading, showLoader, hideLoader } = useLoading();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    type: 'student',
  });
  const [error, setError] = useState('');

  const isEditing = !!userToEdit;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        age: userToEdit.age,
        type: userToEdit.type,
        password: '', 
      });
    }
  }, [userToEdit, isEditing]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    setError('');
    showLoader();

    try {
      let response;
      if (isEditing) {
        const { password, ...dataToUpdate } = formData;
        const payload = password ? formData : dataToUpdate;
        response = await api.patch(`/users/${userToEdit._id}`, payload);
      } else {
        response = await api.post('/users', formData);
      }
      onSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro.');
    } finally {
      hideLoader();
    }
  };

  const canCreateRole = (role) => {
    if (loggedInUser?.type === 'admin') return true;
    if (loggedInUser?.type === 'teacher' && (role === 'teacher' || role === 'tutor' || role === 'student')) return true;
    return false;
  };

  return (
    <>
      <S.FormHeader>
        <h2>{isEditing ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
        <p>{isEditing ? 'Altere os dados do usuário abaixo.' : 'Preencha os dados para criar uma nova conta.'}</p>
      </S.FormHeader>
      
      <S.Form onSubmit={handleSubmit}>
        <S.FormRow>
          <label htmlFor="name">Nome completo</label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} />
        </S.FormRow>

        <S.FormRow>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} />
        </S.FormRow>

        <S.FormRow>
          <label htmlFor="age">Idade</label>
          <input type="number" name="age" id="age" required value={formData.age} onChange={handleChange} />
        </S.FormRow>

        {!isEditing && (
          <S.FormRow>
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" id="password" minLength="4" required value={formData.password} onChange={handleChange} />
          </S.FormRow>
        )}

        <S.FormRow>
          <label htmlFor="type">Tipo de Usuário</label>
          <select name="type" id="type" value={formData.type} onChange={handleChange}>
            <option value="student">Aluno</option>
            {canCreateRole('tutor') && <option value="tutor">Tutor</option>}
            {canCreateRole('teacher') && <option value="teacher">Professor</option>}
            {canCreateRole('admin') && <option value="admin">Administrador</option>}
          </select>
        </S.FormRow>

        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </S.Form>
    </>
  );
}

export default UserForm;