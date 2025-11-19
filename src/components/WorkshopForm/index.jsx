import React, { useState, useEffect } from 'react';
import { useLoading } from '@/hooks/useLoading.js';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import { darkSelectStyles } from '@/styles/selectStyles.js';
import 'flatpickr/dist/themes/dark.css';

import api from '@/services/api.js';

import Button from '@/components/Button';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';

import * as S from './styles.js';

const formatISOToDateTimeLocal = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

function WorkshopForm({ onSuccess, workshopToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    vacancies: { total: 10 },
    teachers: [],
    tutors: [],
  });
  const [availableStaff, setAvailableStaff] = useState({ teachers: [], tutors: [] });
  const [error, setError] = useState('');
  const { isLoading, showLoader, hideLoader } = useLoading();

  const isEditing = !!workshopToEdit;

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await api.get('/users');
        const teachers = response.data
          .filter(user => user.type === 'teacher')
          .map(user => ({ value: user._id, label: user.name }));
        const tutors = response.data
          .filter(user => user.type === 'tutor')
          .map(user => ({ value: user._id, label: user.name }));
        setAvailableStaff({ teachers, tutors });
      } catch (err) {
        setError('Não foi possível carregar a lista de professores e tutores.');
      }
    }
    fetchStaff();
  }, []);

  useEffect(() => {
    if (isEditing && workshopToEdit) {
      setFormData({
        name: workshopToEdit.name || '',
        description: workshopToEdit.description || '',
        startDate: formatISOToDateTimeLocal(workshopToEdit.startDate),
        vacancies: { total: workshopToEdit.vacancies?.total || 10 },
        teachers: workshopToEdit.teachers.map(t => t._id),
        tutors: workshopToEdit.tutors.map(t => t._id),
      });
    } else {
      setFormData({
        name: '',
        description: '',
        startDate: '',
        vacancies: { total: 10 },
        teachers: [],
        tutors: [],
      });
    }
  }, [workshopToEdit, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'totalVacancies') {
      setFormData(prev => ({ ...prev, vacancies: { total: Number(value) } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, startDate: date[0] }));
  };

  const handleMultiSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prev => ({ ...prev, [name]: selectedIds }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    setError('');
    try {
      let response;
      if (isEditing) {
        response = await api.patch(`/workshops/${workshopToEdit._id}`, formData);
      } else {
        response = await api.post('/workshops', formData);
      }
      onSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.message || `Erro ao ${isEditing ? 'atualizar' : 'criar'} oficina.`);
    } finally {
      hideLoader();
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.FormHeader>
        <h2>{isEditing ? 'Editar Oficina' : 'Criar Nova Oficina'}</h2>
        <p>{isEditing ? 'Altere os dados da oficina.' : 'Preencha os dados da nova oficina.'}</p>
      </S.FormHeader>

      <S.ScrollableContent>
        <S.FormRow>
          <label htmlFor="name">Nome da Oficina</label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} />
        </S.FormRow>
        
        <S.FormRow>
          <label htmlFor="description">Descrição</label>
          <textarea name="description" id="description" required value={formData.description} onChange={handleChange} />
        </S.FormRow>
        
        <S.FormRow>
          <label htmlFor="startDate">Data e Hora de Início</label>
          <Flatpickr
            data-enable-time
            value={formData.startDate}
            onChange={handleDateChange}
            options={{
              dateFormat: "Y-m-d H:i",
              time_24hr: true,
              locale: Portuguese,
            }}
            render={({ value, ...props }, ref) => {
              return <input {...props} ref={ref} placeholder="Selecione a data e hora" />
            }}
          />
        </S.FormRow>
        
        <S.FormRow>
          <label htmlFor="totalVacancies">Vagas Totais</label>
          <input type="number" name="totalVacancies" id="totalVacancies" min="1" required value={formData.vacancies.total} onChange={handleChange} />
        </S.FormRow>
        
        <S.FormRow>
          <label htmlFor="teachers">Professores</label>
          <Select
            id="teachers"
            name="teachers"
            isMulti
            options={availableStaff.teachers}
            styles={darkSelectStyles}
            value={availableStaff.teachers.filter(option => formData.teachers.includes(option.value))}
            onChange={handleMultiSelectChange}
            menuPortalTarget={document.body}
            placeholder="Selecione os professores"
          />
        </S.FormRow>
        
        <S.FormRow>
          <label htmlFor="tutors">Tutores</label>
          <Select
            id="tutors"
            name="tutors"
            isMulti
            options={availableStaff.tutors}
            styles={darkSelectStyles}
            value={availableStaff.tutors.filter(option => formData.tutors.includes(option.value))}
            onChange={handleMultiSelectChange}
            menuPortalTarget={document.body}
            placeholder="Selecione os tutores"
          />
        </S.FormRow>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.ScrollableContent>

      <S.ModalFooter>
        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Oficina'}
        </Button>
      </S.ModalFooter>
    </S.Form>
  );
}

export default WorkshopForm;