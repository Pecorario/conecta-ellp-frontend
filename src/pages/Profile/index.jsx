import React, { useState } from 'react';
import api from '@/services/api.js';
import { useAuth } from '@/hooks/useAuth.js';
import { useLoading } from '@/hooks/useLoading.js';
import { toast } from 'react-toastify';
import UserForm from '@/components/UserForm';
import Button from '@/components/Button';
import * as S from './styles.js';
import { FormRow } from '@/components/UserForm/styles.js';

function ProfilePage() {
  const { user, handleUpdateUser } = useAuth();
  const { isLoading, showLoader, hideLoader } = useLoading();
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('A nova senha e a confirmação não conferem.');
      return;
    }

    showLoader();
    try {
      await api.post('/users/change-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('Senha alterada com sucesso!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const apiError = err.response?.data?.message || 'Erro ao alterar senha.';
      setPasswordError(apiError);
      toast.error(apiError);
    } finally {
      hideLoader();
    }
  };

  const onProfileSuccess = (updatedUser) => {
    handleUpdateUser(updatedUser);
  };

  return (
    <S.ScreenContainer>
      <S.FixedSection>
        <S.ScreenTitle>
          <h1>Meu Perfil</h1>
        </S.ScreenTitle>
      </S.FixedSection>

      <S.ScrollableContent>
        <S.ProfileContent>
          <S.ProfileSection>
            <S.SectionTitle>Dados Pessoais</S.SectionTitle>
            <UserForm 
              userToEdit={user} 
              onSuccess={onProfileSuccess}
              mode="profile" 
            />
          </S.ProfileSection>

          <S.ProfileSection>
            <S.SectionTitle>Alterar Senha</S.SectionTitle>
            <S.PasswordForm onSubmit={handlePasswordSubmit}>
              <FormRow>
                <label htmlFor="oldPassword">Senha Antiga</label>
                <input 
                  type="password" 
                  name="oldPassword" 
                  id="oldPassword"
                  required
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                />
              </FormRow>
              <FormRow>
                <label htmlFor="newPassword">Nova Senha</label>
                <input 
                  type="password" 
                  name="newPassword" 
                  id="newPassword"
                  minLength="4"
                  required
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </FormRow>
              <FormRow>
                <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword"
                  minLength="4"
                  required
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </FormRow>
              
              {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}
              
              <Button variant="secondary" type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Alterar Senha'}
              </Button>
            </S.PasswordForm>
          </S.ProfileSection>
        </S.ProfileContent>
      </S.ScrollableContent>
    </S.ScreenContainer>
  );
}

export default ProfilePage;