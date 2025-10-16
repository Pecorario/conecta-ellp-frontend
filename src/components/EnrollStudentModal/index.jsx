import React, { useState, useEffect } from 'react';
import api from '@/services/api.js';
import { useLoading } from '@/hooks/useLoading.js';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
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
          const students = usersResponse.data.filter(user => 
            user.type === 'student' && !enrolledIds.includes(user._id)
          );
          
          setAvailableStudents(students);
          if (students.length > 0) {
            setSelectedStudentId(students[0]._id);
          }
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
        <S.ModalTitle>Inscrever Aluno</S.ModalTitle>
        
        <S.FormRow>
          <label htmlFor="student-select">Selecione o Aluno</label>
          <select
            id="student-select"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            {availableStudents.length > 0 ? (
              availableStudents.map(student => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))
            ) : (
              <option disabled>Nenhum aluno disponível para inscrição</option>
            )}
          </select>
        </S.FormRow>

        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

        <Button 
          variant="secondary" 
          type="submit" 
          disabled={isLoading || availableStudents.length === 0}
        >
          Inscrever Aluno
        </Button>
      </S.FormContainer>
    </Modal>
  );
}

export default EnrollStudentModal;