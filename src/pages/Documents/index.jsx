import React, { useState, useEffect } from 'react';
import api from '@/services/api.js';
import Button from '@/components/Button';
import { useLoading } from '@/hooks/useLoading.js';
import * as S from './styles.js';

function DocumentsPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [error, setError] = useState('');
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    async function fetchVolunteers() {
      showLoader();
      try {
        const response = await api.get('/users');
        const filteredVolunteers = response.data.filter(
          user => user.type === 'teacher' || user.type === 'tutor'
        );
        setVolunteers(filteredVolunteers);
      } catch (err) {
        setError('Não foi possível carregar a lista de voluntários.');
        console.error('Erro ao buscar voluntários:', err);
      } finally {
        hideLoader();
      }
    }
    fetchVolunteers();
  }, [showLoader, hideLoader]);

  const handleCheckboxChange = (volunteerId) => {
    setSelectedVolunteers(currentSelected =>
      currentSelected.includes(volunteerId)
        ? currentSelected.filter(id => id !== volunteerId)
        : [...currentSelected, volunteerId]
    );
  };

  const handleGenerateDocuments = async () => {
    if (selectedVolunteers.length === 0) {
      alert('Por favor, selecione pelo menos um voluntário.');
      return;
    }

    showLoader();
    try {
      const response = await api.post('/documents/volunteer-agreements', {
        userIds: selectedVolunteers
      }, {
        responseType: 'blob', // Importante: informa ao axios para tratar a resposta como um arquivo
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Termos_de_Voluntariado.zip');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Erro ao gerar documentos:', err);
      alert('Ocorreu um erro ao gerar os documentos.');
    } finally {
      hideLoader();
    }
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
        <h1>Gerar Documentos</h1>
      </S.ScreenTitle>

      <S.ContentContainer>
        <S.SectionTitle>Termo de Voluntariado</S.SectionTitle>
        <p style={{ color: '#94A3B8', marginTop: '-1rem' }}>
          Selecione os professores e/ou tutores para gerar os termos de adesão.
        </p>
        <S.VolunteerList>
          {volunteers.map(volunteer => (
            <S.VolunteerListItem key={volunteer._id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedVolunteers.includes(volunteer._id)}
                  onChange={() => handleCheckboxChange(volunteer._id)}
                />
                {volunteer.name} ({volunteer.type})
              </label>
            </S.VolunteerListItem>
          ))}
        </S.VolunteerList>
        <S.ActionsContainer>
          <Button
            variant="secondary"
            onClick={handleGenerateDocuments}
            disabled={selectedVolunteers.length === 0}
          >
            Gerar Termos
          </Button>
        </S.ActionsContainer>
      </S.ContentContainer>
    </S.ScreenContainer>
  );
}

export default DocumentsPage;