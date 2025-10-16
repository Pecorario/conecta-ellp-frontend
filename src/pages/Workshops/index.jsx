import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/api.js';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import WorkshopForm from '@/components/WorkshopForm';
import { useLoading } from '@/hooks/useLoading.js';
import { useAuth } from '@/hooks/useAuth.js';
import * as S from './styles.js';

function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showLoader, hideLoader } = useLoading();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchWorkshops() {
      showLoader();
      try {
        const response = await api.get('/workshops');
        setWorkshops(response.data);
      } catch (err) {
        setError('Não foi possível carregar as oficinas.');
        console.error('Erro ao buscar oficinas:', err);
      } finally {
        hideLoader();
      }
    }
    fetchWorkshops();
  }, [showLoader, hideLoader]);

  const handleEnrollment = async (workshopId, isEnrolling) => {
    showLoader();
    try {
      const endpoint = isEnrolling ? `/workshops/${workshopId}/enroll` : `/workshops/${workshopId}/unenroll`;
      const response = await api.post(endpoint);
      const updatedWorkshop = response.data;
      
      setWorkshops(currentWorkshops => 
        currentWorkshops.map(ws => 
          ws._id === workshopId ? { ...ws, enrolledStudents: updatedWorkshop.enrolledStudents, vacancies: updatedWorkshop.vacancies } : ws
        )
      );
    } catch (err) {
      console.error('Erro ao processar inscrição:', err);
      alert(err.response?.data?.message || 'Ocorreu um erro.');
    } finally {
      hideLoader();
    }
  };

  const handleCreateWorkshopSuccess = (newWorkshop) => {
    setWorkshops(currentWorkshops => [newWorkshop, ...currentWorkshops]);
    setIsCreateModalOpen(false);
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
        <h1>Oficinas Disponíveis</h1>
        {(user?.type === 'admin' || user?.type === 'teacher') && (
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            + Nova Oficina
          </Button>
        )}
      </S.ScreenTitle>

      <S.CardsContainer>
        {workshops.map(workshop => {
          const isEnrolled = workshop.enrolledStudents.some(student => student._id === user?._id);

          if (user?.type === 'student') {
            return (
              <S.WorkshopCard key={workshop._id}>
                <S.CardHeader>
                  <h3>{workshop.name}</h3>
                  <span>{workshop.status}</span>
                </S.CardHeader>
                <S.CardDescription>{workshop.description}</S.CardDescription>
                <S.CardInfo>
                  <S.CardInfoRow>
                    <span>Data de início:</span>
                    <p>{new Date(workshop.startDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </S.CardInfoRow>
                  <S.CardInfoRow>
                    <span>Vagas:</span>
                    <p>{workshop.vacancies.filled}/{workshop.vacancies.total}</p>
                  </S.CardInfoRow>
                  {isEnrolled ? (
                    <Button variant="secondary" onClick={() => handleEnrollment(workshop._id, false)}>Inscrito</Button>
                  ) : (
                    <Button variant="quaternary" onClick={() => handleEnrollment(workshop._id, true)}>Inscrever-se</Button>
                  )}
                </S.CardInfo>
              </S.WorkshopCard>
            );
          } else {
            return (
              <Link to={`/workshops/${workshop._id}`} key={workshop._id} style={{ textDecoration: 'none' }}>
                <S.WorkshopCard>
                  <S.CardHeader>
                    <h3>{workshop.name}</h3>
                    <span>{workshop.status}</span>
                  </S.CardHeader>
                  <S.CardDescription>{workshop.description}</S.CardDescription>
                  <S.CardInfo>
                    <S.CardInfoRow>
                      <span>Data de início:</span>
                      <p>{new Date(workshop.startDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </S.CardInfoRow>
                    <S.CardInfoRow>
                      <span>Vagas:</span>
                      <p>{workshop.vacancies.filled}/{workshop.vacancies.total}</p>
                    </S.CardInfoRow>
                    <Button variant="quaternary" as="div">Gerenciar</Button>
                  </S.CardInfo>
                </S.WorkshopCard>
              </Link>
            );
          }
        })}
      </S.CardsContainer>

      <Modal isOpen={isCreateModalOpen} handleClose={() => setIsCreateModalOpen(false)}>
        <WorkshopForm onSuccess={handleCreateWorkshopSuccess} />
      </Modal>

    </S.ScreenContainer>
  );
}

export default WorkshopsPage;