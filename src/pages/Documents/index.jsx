import React, { useState, useEffect } from 'react';
import api from '@/services/api.js';
import Button from '@/components/Button';
import { useLoading } from '@/hooks/useLoading.js';
import Select from 'react-select';
import { darkSelectStyles } from '@/styles/selectStyles.js';
import * as S from './styles.js';
import { toast } from 'react-toastify';

function DocumentsPage() {
  const [volunteerOptions, setVolunteerOptions] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [error, setError] = useState('');
  const { isLoading, showLoader, hideLoader } = useLoading();

  useEffect(() => {
    async function fetchVolunteers() {
      showLoader();
      try {
        const response = await api.get('/users');
        const filteredVolunteers = response.data.filter(
          user => user.type === 'teacher' || user.type === 'tutor'
        );
        
        const options = filteredVolunteers.map(user => ({
          value: user._id,
          label: `${user.name} (${user.type})`
        }));
        setVolunteerOptions(options);

      } catch (err) {
        setError('Não foi possível carregar a lista de voluntários.');
        console.error('Erro ao buscar voluntários:', err);
      } finally {
        hideLoader();
      }
    }
    fetchVolunteers();
  }, [showLoader, hideLoader]);

  const handleGenerateDocuments = async () => {
    if (selectedVolunteers.length === 0) {
      toast.warn('Por favor, selecione pelo menos um voluntário.');
      return;
    }

    showLoader();
    try {
      const userIds = selectedVolunteers.map(option => option.value);

      const response = await api.post('/documents/volunteer-agreements', {
        userIds: userIds
      }, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Termos_de_Voluntariado.zip');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Documentos gerados com sucesso!');

    } catch (err) {
      console.error('Erro ao gerar documentos:', err);
      toast.error('Ocorreu um erro ao gerar os documentos.');
    } finally {
      hideLoader();
    }
  };

  if (error) {
    return (
      <S.ScreenContainer>
        <p style={{ color: '#ef4444', padding: '2rem' }}>{error}</p>
      </S.ScreenContainer>
    );
  }

  return (
    <S.ScreenContainer>
      <S.FixedSection>
        <S.ScreenTitle>
          <h1>Gerar Documentos</h1>
        </S.ScreenTitle>
      </S.FixedSection>

      <S.ScrollableContent>
        <S.ContentContainer>
          <S.SectionTitle>Termo de Voluntariado</S.SectionTitle>
          <p style={{ color: '#94A3B8', marginTop: '-1rem' }}>
            Selecione os professores e/ou tutores para gerar os termos de adesão.
          </p>
          
          {!isLoading && volunteerOptions.length === 0 ? (
            <p style={{ color: '#94A3B8', textAlign: 'center', padding: '1rem 0' }}>
              Nenhum voluntário (professor ou tutor) encontrado no sistema.
            </p>
          ) : (
            <>
              <Select
                isMulti
                options={volunteerOptions}
                value={selectedVolunteers}
                onChange={setSelectedVolunteers}
                styles={darkSelectStyles}
                placeholder="Selecione os voluntários..."
                noOptionsMessage={() => 'Nenhum voluntário encontrado'}
                menuPortalTarget={document.body}
              />

              <S.ActionsContainer>
                <Button
                  variant="secondary"
                  onClick={handleGenerateDocuments}
                  disabled={selectedVolunteers.length === 0}
                >
                  Gerar Termos
                </Button>
              </S.ActionsContainer>
            </>
          )}
        </S.ContentContainer>
      </S.ScrollableContent>
    </S.ScreenContainer>
  );
}

export default DocumentsPage;