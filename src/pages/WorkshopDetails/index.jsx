import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/services/api.js';
import { useAuth } from '@/hooks/useAuth.js';
import { useLoading } from '@/hooks/useLoading.js';
import Button from '@/components/Button';
import EnrollStudentModal from '@/components/EnrollStudentModal';
import WorkshopForm from '@/components/WorkshopForm';
import Modal from '@/components/Modal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import * as S from './styles.js';

function WorkshopDetailsPage() {
  const { id: workshopId } = useParams();
  const { user } = useAuth();
  const { showLoader, hideLoader } = useLoading();
  const navigate = useNavigate();

  const [workshop, setWorkshop] = useState(null);
  const [error, setError] = useState('');
  const [presentStudents, setPresentStudents] = useState([]);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  useEffect(() => {
    async function fetchWorkshopDetails() {
      showLoader();
      try {
        const response = await api.get(`/workshops/${workshopId}`);
        setWorkshop(response.data);

        if (response.data.attendance && response.data.attendance.length > 0) {
          const lastAttendance = response.data.attendance[response.data.attendance.length - 1];
          setPresentStudents(lastAttendance.presentStudents);
        }
      } catch (err) {
        setError('Não foi possível carregar os detalhes da oficina.');
      } finally {
        hideLoader();
      }
    }

    fetchWorkshopDetails();
  }, [workshopId, showLoader, hideLoader]);

  const handleTogglePresence = (studentId) => {
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
      toast.success('Chamada salva com sucesso!');
      const response = await api.get(`/workshops/${workshopId}`);
      setWorkshop(response.data);
    } catch (err) {
      toast.error('Erro ao salvar chamada.');
    } finally {
      hideLoader();
    }
  };

  const handleEnrollSuccess = (updatedWorkshop) => {
    setWorkshop(updatedWorkshop);
    toast.success('Aluno inscrito com sucesso!');
  };

  const handleEditSuccess = (updatedWorkshop) => {
    setWorkshop(updatedWorkshop);
    setIsEditModalOpen(false);
    toast.success('Oficina atualizada com sucesso!');
  };

  const onDeleteWorkshopClick = () => {
    setConfirmationData({ type: 'delete_workshop' });
  };

  const onRemoveStudentClick = (studentId, studentName) => {
    setConfirmationData({ type: 'remove_student', data: { id: studentId, name: studentName } });
  };

  const handleConfirmationAction = async () => {
    if (!confirmationData) return;

    showLoader();
    try {
      if (confirmationData.type === 'delete_workshop') {
        await api.delete(`/workshops/${workshopId}`);
        toast.success('Oficina removida com sucesso!');
        navigate('/');
      } 
      else if (confirmationData.type === 'remove_student') {
        const response = await api.post(`/workshops/${workshopId}/remove-student`, { studentId: confirmationData.data.id });
        setWorkshop(response.data);
        toast.success('Aluno removido com sucesso!');
      }
      setConfirmationData(null);
    } catch (err) {
      console.error('Erro na ação:', err);
      toast.error('Ocorreu um erro ao realizar a ação.');
    } finally {
      hideLoader();
    }
  };

  if (!workshop) {
    return (
      <S.ScreenContainer>
        {error ? <p style={{ color: '#ef4444', padding: '2rem' }}>{error}</p> : null}
      </S.ScreenContainer>
    );
  }

  const isTeacherOrAdmin = user?.type === 'admin' || workshop.teachers.some(t => t._id === user?._id);
  const isAuthorizedToCall = isTeacherOrAdmin || workshop.tutors.some(t => t._id === user?._id);

  return (
    <S.ScreenContainer>
      <S.FixedSection>
        <S.HeaderContent>
          <S.HeaderInfo>
            <h1>{workshop.name}</h1>
            <p>{workshop.description}</p>
          </S.HeaderInfo>
          {isTeacherOrAdmin && (
            <S.HeaderActions>
              <Button variant="primary" onClick={() => setIsEditModalOpen(true)}>
                Editar Oficina
              </Button>
              <Button 
                variant="danger" 
                onClick={onDeleteWorkshopClick}
                title="Apagar Oficina"
                className="icon-button"
              >
                <FaTrashAlt />
              </Button>
            </S.HeaderActions>
          )}
        </S.HeaderContent>
      </S.FixedSection>

      <S.ScrollableContent>
        <S.DetailsContent>
          <S.InfoColumn>
            <S.InfoBlock>
              <span>Status</span>
              <p>{workshop.status}</p>
            </S.InfoBlock>
            <S.InfoBlock>
              <span>Inscritos</span>
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
            <S.AttendanceTitle>Alunos Inscritos ({workshop.enrolledStudents.length})</S.AttendanceTitle>
            {isTeacherOrAdmin && (
              <Button variant="primary" onClick={() => setIsEnrollModalOpen(true)}>Inscrever Aluno</Button>
            )}
          </div>
          
          <S.StudentList>
            {workshop.enrolledStudents.length > 0 ? (
              workshop.enrolledStudents.map(student => {
                const isPresent = presentStudents.includes(student._id);
                return (
                  <S.StudentListItem key={student._id}>
                    <S.StudentName>{student.name}</S.StudentName>
                    <S.ActionButtons>
                      <S.PresenceButton
                        $isPresent={isPresent}
                        onClick={() => handleTogglePresence(student._id)}
                        disabled={!isAuthorizedToCall}
                      >
                        {isPresent ? <FaCheck /> : <FaTimes />}
                        {isPresent ? 'Presente' : 'Ausente'}
                      </S.PresenceButton>
                      <S.RemoveButton
                        title="Desinscrever aluno"
                        onClick={() => onRemoveStudentClick(student._id, student.name)}
                        disabled={!isTeacherOrAdmin}
                      >
                        <FaTimes />
                      </S.RemoveButton>
                    </S.ActionButtons>
                  </S.StudentListItem>
                );
              })
            ) : (
              <p style={{ color: '#94A3B8' }}>Nenhum aluno inscrito nesta oficina ainda.</p>
            )}
          </S.StudentList>

          <S.ButtonContainer>
            <Button 
              variant="secondary" 
              onClick={handleSaveAttendance} 
              disabled={!isAuthorizedToCall || workshop.enrolledStudents.length === 0}
            >
              Salvar Chamada
            </Button>
          </S.ButtonContainer>
        </S.AttendanceSection>
      </S.ScrollableContent>
      
      <EnrollStudentModal
        isOpen={isEnrollModalOpen}
        handleClose={() => setIsEnrollModalOpen(false)}
        workshop={workshop}
        onEnrollSuccess={handleEnrollSuccess}
      />

      <Modal isOpen={isEditModalOpen} handleClose={() => setIsEditModalOpen(false)}>
        <WorkshopForm 
          onSuccess={handleEditSuccess} 
          workshopToEdit={workshop}
        />
      </Modal>

      <ConfirmationModal
        isOpen={!!confirmationData}
        onClose={() => setConfirmationData(null)}
        onConfirm={handleConfirmationAction}
        title={confirmationData?.type === 'delete_workshop' ? 'Apagar Oficina' : 'Remover Aluno'}
        message={
          confirmationData?.type === 'delete_workshop' 
            ? 'Tem certeza que deseja apagar esta oficina? Esta ação não pode ser desfeita.' 
            : `Tem certeza que deseja desinscrever o aluno "${confirmationData?.data?.name}" desta oficina?`
        }
        confirmText={confirmationData?.type === 'delete_workshop' ? 'Apagar' : 'Remover'}
        confirmVariant="danger"
      />
    </S.ScreenContainer>
  );
}

export default WorkshopDetailsPage;