import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api.js';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import WorkshopForm from '@/components/WorkshopForm';
import { useLoading } from '@/hooks/useLoading.js';
import { useAuth } from '@/hooks/useAuth.js';
import { toast } from 'react-toastify';
import * as S from './styles.js';

const statusMap = {
  open: { text: 'Disponível', priority: 1 },
  full: { text: 'Lotada', priority: 2 },
  closed: { text: 'Encerrada', priority: 3 },
};

const filterOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'open', label: 'Disponíveis' },
  { value: 'full', label: 'Lotadas' },
  { value: 'closed', label: 'Encerradas' },
];

function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { showLoader, hideLoader } = useLoading();
  const { user } = useAuth();
  const now = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkshops() {
      showLoader();
      try {
        const response = await api.get('/workshops');

        const processedWorkshops = response.data.map(ws => {
          const isWorkshopClosed = now > new Date(ws.startDate) || ws.status !== 'scheduled';
          const isWorkshopFull = ws.vacancies.filled >= ws.vacancies.total;

          let computedStatus;
          if (isWorkshopClosed) {
            computedStatus = 'closed';
          } else if (isWorkshopFull) {
            computedStatus = 'full';
          } else {
            computedStatus = 'open';
          }

          return {
            ...ws,
            computedStatus,
            sortPriority: statusMap[computedStatus].priority,
          };
        });

        const sortedWorkshops = processedWorkshops.sort((a, b) => a.sortPriority - b.sortPriority);

        setWorkshops(sortedWorkshops);
      } catch (err) {
        setError('Não foi possível carregar as oficinas.');
        console.error('Erro ao buscar oficinas:', err);
      } finally {
        hideLoader();
      }
    }
    fetchWorkshops();
  }, [showLoader, hideLoader]);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(ws => {
      const matchStatus = activeFilter === 'all' || ws.computedStatus === activeFilter;

      const searchLower = searchTerm.toLowerCase();
      const matchSearch = ws.name.toLowerCase().includes(searchLower) ||
        ws.description.toLowerCase().includes(searchLower);

      return matchStatus && matchSearch;
    });
  }, [workshops, activeFilter, searchTerm]);


  const handleEnrollment = async (workshopId, isEnrolling) => {
    showLoader();
    try {
      const endpoint = isEnrolling ? `/workshops/${workshopId}/enroll` : `/workshops/${workshopId}/unenroll`;
      const response = await api.post(endpoint);
      const updatedWorkshop = response.data;

      setWorkshops(currentWorkshops =>
        currentWorkshops.map(ws =>
          ws._id === workshopId ? {
            ...ws,
            enrolledStudents: updatedWorkshop.enrolledStudents,
            vacancies: updatedWorkshop.vacancies
          } : ws
        )
      );
      toast.success(isEnrolling ? 'Inscrição realizada!' : 'Inscrição cancelada.');
    } catch (err) {
      console.error('Erro ao processar inscrição:', err);
      toast.error(err.response?.data?.message || 'Ocorreu um erro.');
    } finally {
      hideLoader();
    }
  };

  const handleCreateWorkshopSuccess = (newWorkshop) => {
    const newWorkshopProcessed = {
      ...newWorkshop,
      computedStatus: 'open',
      sortPriority: 1,
    };
    setWorkshops(currentWorkshops =>
      [newWorkshopProcessed, ...currentWorkshops].sort((a, b) => a.sortPriority - b.sortPriority)
    );
    setIsCreateModalOpen(false);
    toast.success('Oficina criada com sucesso!');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return (
      <S.ScreenContainer>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.ScreenContainer>
    );
  }

  return (
    <S.ScreenContainer>
      <S.FixedSection>
        <S.ScreenTitle>
          <h1>Oficinas Disponíveis</h1>
          {(user?.type === 'admin' || user?.type === 'teacher') && (
            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
              + Nova Oficina
            </Button>
          )}
        </S.ScreenTitle>

        <S.FilterContainer>
          <S.SearchInput
            type="text"
            placeholder="Buscar oficina..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {filterOptions.map(option => (
            <S.FilterButton
              key={option.value}
              $isActive={activeFilter === option.value}
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
            </S.FilterButton>
          ))}
        </S.FilterContainer>
      </S.FixedSection>

      <S.ScrollableContent>
        {workshops.length === 0 && (
          <S.EmptyStateContainer>
            <p>Nenhuma oficina encontrada no momento.</p>
          </S.EmptyStateContainer>
        )}

        {workshops.length > 0 && filteredWorkshops.length === 0 && (
          <S.EmptyStateContainer>
            <p>Nenhuma oficina encontrada com o filtro selecionado.</p>
          </S.EmptyStateContainer>
        )}

        <S.CardsContainer>
          {filteredWorkshops.map(workshop => {
            const isEnrolled = workshop.enrolledStudents.some(student => student._id === user?._id);
            const displayStatus = workshop.computedStatus;
            const statusText = statusMap[displayStatus].text;

            if (user?.type === 'student') {
              return (
                <S.WorkshopCard key={workshop._id}>
                  <S.CardHeader>
                    <h3>{workshop.name}</h3>
                    <S.StatusBadge $status={displayStatus}>
                      {statusText}
                    </S.StatusBadge>
                  </S.CardHeader>
                  <S.CardDescription>{workshop.description}</S.CardDescription>
                  <S.CardInfo>
                    <S.CardInfoRow>
                      <span>Data de início:</span>
                      <p>{new Date(workshop.startDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </S.CardInfoRow>
                    <S.CardInfoRow>
                      <span>Inscritos:</span>
                      <p>{workshop.vacancies.filled}/{workshop.vacancies.total}</p>
                    </S.CardInfoRow>

                    {displayStatus === 'closed' ? (
                      <Button variant="quaternary" disabled>Inscrições encerradas</Button>
                    ) : displayStatus === 'full' ? (
                      <Button variant="quaternary" disabled>Lotada</Button>
                    ) : isEnrolled ? (
                      <Button variant="secondary" onClick={() => handleEnrollment(workshop._id, false)}>Inscrito</Button>
                    ) : (
                      <Button variant="quaternary" onClick={() => handleEnrollment(workshop._id, true)}>Inscrever-se</Button>
                    )}
                  </S.CardInfo>
                </S.WorkshopCard>
              );
            } else {
              return (
                <S.WorkshopCard key={workshop._id}>
                  <S.CardHeader>
                    <h3>{workshop.name}</h3>
                    <S.StatusBadge $status={displayStatus}>
                      {statusText}
                    </S.StatusBadge>
                  </S.CardHeader>
                  <S.CardDescription>{workshop.description}</S.CardDescription>
                  <S.CardInfo>
                    <S.CardInfoRow>
                      <span>Data de início:</span>
                      <p>{new Date(workshop.startDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </S.CardInfoRow>
                    <S.CardInfoRow>
                      <span>Inscritos:</span>
                      <p>{workshop.vacancies.filled}/{workshop.vacancies.total}</p>
                    </S.CardInfoRow>
                    <Button
                      variant="quaternary"
                      onClick={() => navigate(`/workshops/${workshop._id}`)}
                    >
                      Gerenciar
                    </Button>
                  </S.CardInfo>
                </S.WorkshopCard>
              );
            }
          })}
        </S.CardsContainer>
      </S.ScrollableContent>

      <Modal isOpen={isCreateModalOpen} handleClose={() => setIsCreateModalOpen(false)}>
        <WorkshopForm onSuccess={handleCreateWorkshopSuccess} />
      </Modal>

    </S.ScreenContainer>
  );
}

export default WorkshopsPage;