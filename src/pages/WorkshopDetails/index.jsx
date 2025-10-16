import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/services/api.js';
import { useAuth } from '@/hooks/useAuth.js';
import { useLoading } from '@/hooks/useLoading.js';
import Button from '@/components/Button';
import EnrollStudentModal from '@/components/EnrollStudentModal';
import * as S from './styles.js';

function WorkshopDetailsPage() {
  const { id: workshopId } = useParams();
  const { user } = useAuth();
  const { showLoader, hideLoader } = useLoading();

  const [workshop, setWorkshop] = useState(null);
  const [error, setError] = useState('');
  const [presentStudents, setPresentStudents] = useState([]);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  useEffect(() => {
    async function fetchWorkshopDetails() {
      showLoader();
      try {
        const response = await api.get(`/workshops/${workshopId}`);
        setWorkshop(response.data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes da oficina.');
        console.error('Erro ao buscar detalhes da oficina:', err);
      } finally {
        hideLoader();
      }
    }

    fetchWorkshopDetails();
  }, [workshopId, showLoader, hideLoader]);
  
  const handleCheckboxChange = (studentId) => {
    setPresentStudents(currentPresent =>
      currentPresent.includes(studentId)
        ? currentPresent.filter(id => id !== studentId)
        : [...currentPresent, studentId]
    );
  };

  const handleSaveAttendance = async () => {
    showLoader();
    try {
      await api.post(`/workshops/${workshopId}/attendance`, { presentStudentIds: presentStudents });
      alert('Chamada salva com sucesso!');
    } catch (err) {
      alert('Erro ao salvar chamada.');
      console.error('Erro ao salvar chamada:', err);
    } finally {
      hideLoader();
    }
  };

  const handleEnrollSuccess = (updatedWorkshop) => {
    setWorkshop(updatedWorkshop);
  };

  if (!workshop) {
    return (
      <S.ScreenContainer>
        {error ? <p style={{ color: '#ef4444' }}>{error}</p> : null}
      </S.ScreenContainer>
    );
  }

  const isUserAuthorized = user?.type === 'admin' || workshop.teachers.some(t => t._id === user?._id);

  return (
    <S.ScreenContainer>
      <S.DetailsHeader>
        <h1>{workshop.name}</h1>
        <p>{workshop.description}</p>
      </S.DetailsHeader>

      <S.DetailsContent>
        <S.InfoColumn>
          <S.InfoBlock>
            <span>Status</span>
            <p>{workshop.status}</p>
          </S.InfoBlock>
          <S.InfoBlock>
            <span>Vagas</span>
            <p>{workshop.vacancies.filled} / {workshop.vacancies.total}</p>
          </S.InfoBlock>
        </S.InfoColumn>
        <S.InfoColumn>
          <S.InfoBlock>
            <span>Data de Início</span>
            <p>{new Date(workshop.startDate).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}</p>
          </S.InfoBlock>
          <S.InfoBlock>
            <span>Professores</span>
            <p>{workshop.teachers.map(t => t.name).join(', ') || 'Nenhum'}</p>
          </S.InfoBlock>
        </S.InfoColumn>
      </S.DetailsContent>

      <S.AttendanceSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <S.AttendanceTitle>Alunos Inscritos</S.AttendanceTitle>
          {isUserAuthorized && (
            <Button variant="primary" onClick={() => setIsEnrollModalOpen(true)}>Inscrever Aluno</Button>
          )}
        </div>
        <S.StudentList>
          {workshop.enrolledStudents.length > 0 ? workshop.enrolledStudents.map(student => (
            <S.StudentListItem key={student._id}>
              <label>
                <input
                  type="checkbox"
                  checked={presentStudents.includes(student._id)}
                  onChange={() => handleCheckboxChange(student._id)}
                  disabled={!isUserAuthorized}
                />
                {student.name}
              </label>
            </S.StudentListItem>
          )) : <p style={{ color: '#94A3B8' }}>Nenhum aluno inscrito nesta oficina ainda.</p>}
        </S.StudentList>
        <Button variant="secondary" onClick={handleSaveAttendance} disabled={!isUserAuthorized || workshop.enrolledStudents.length === 0}>
          Salvar Chamada
        </Button>
      </S.AttendanceSection>
      
      <EnrollStudentModal
        isOpen={isEnrollModalOpen}
        handleClose={() => setIsEnrollModalOpen(false)}
        workshop={workshop}
        onEnrollSuccess={handleEnrollSuccess}
      />
    </S.ScreenContainer>
  );
}

export default WorkshopDetailsPage;