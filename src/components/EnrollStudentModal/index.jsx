import React, { useState, useEffect } from 'react';
import { useLoading } from '@/hooks/useLoading.js';
import { darkSelectStyles } from '@/styles/selectStyles.js';

import api from '@/services/api.js';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Select from 'react-select';

import * as S from './styles.js';

function EnrollStudentModal({ isOpen, handleClose, workshop, onEnrollSuccess }) {
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [error, setError] = useState('');
  const { isLoading, showLoader, hideLoader } = useLoading();

  useEffect(() => {
    if (isOpen) {
      async function fetchAvailableStudents() {
        showLoader();
        try {
          const usersResponse = await api.get('/users');
          
          const enrolledIds = workshop.enrolledStudents.map(student => student._id);
          const students = usersResponse.data
            .filter(user => user.type === 'student' && !enrolledIds.includes(user._id))
            .map(user => ({ 
              value: user._id,
              label: user.name
            }));
          
          setAvailableStudents(students);
          setSelectedStudentId('');
        } catch (err) {
          setError('Não foi possível carregar a lista de alunos.');
        } finally {
          hideLoader();
        }
      }
      fetchAvailableStudents();
    }
  }, [isOpen, workshop, showLoader, hideLoader]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedStudentId) {
      setError('Por favor, selecione um aluno.');
      return;
    }
    
    showLoader();
    setError('');
    try {
      const response = await api.post(`/workshops/${workshop._id}/enroll`, { studentId: selectedStudentId });
      onEnrollSuccess(response.data);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao inscrever aluno.');
    } finally {
      hideLoader();
    }
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <S.FormContainer onSubmit={handleSubmit}>
        <S.ModalHeader>
          <S.ModalTitle>Inscrever Aluno</S.ModalTitle>
        </S.ModalHeader>
        
        <S.ScrollableContent>
          <S.FormRow>
            <label htmlFor="student-select">Selecione o Aluno</label>
            <Select
              id="student-select"
              options={availableStudents}
              styles={darkSelectStyles}
              value={availableStudents.find(option => option.value === selectedStudentId)}
              onChange={(selectedOption) => setSelectedStudentId(selectedOption.value)}
              menuPortalTarget={document.body}
              placeholder="Selecione o aluno..."
              noOptionsMessage={() => 'Nenhum aluno disponível'}
            />
          </S.FormRow>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.ScrollableContent>

        <S.ModalFooter>
          <Button 
            variant="secondary" 
            type="submit" 
            disabled={isLoading || availableStudents.length === 0}
          >
            Inscrever Aluno
          </Button>
        </S.ModalFooter>
      </S.FormContainer>
    </Modal>
  );
}

export default EnrollStudentModal;