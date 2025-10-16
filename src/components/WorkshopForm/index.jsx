import React, { useState, useEffect, useRef } from 'react';
import api from '@/services/api.js';
import { useLoading } from '@/hooks/useLoading.js';
import Button from '@/components/Button';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import * as S from './styles.js';

function WorkshopForm({ onSuccess }) {
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

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await api.get('/users');
        const teachers = response.data.filter(user => user.type === 'teacher');
        const tutors = response.data.filter(user => user.type === 'tutor');
        setAvailableStaff({ teachers, tutors });
      } catch (err) {
        setError('Não foi possível carregar a lista de professores e tutores.');
      }
    }
    fetchStaff();
  }, []);

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

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData(prev => ({ ...prev, [name]: selectedValues }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    setError('');
    try {
      const response = await api.post('/workshops', formData);
      onSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar oficina.');
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <S.FormHeader>
        <h2>Criar Nova Oficina</h2>
        <p>Preencha os dados da nova oficina.</p>
      </S.FormHeader>

      <S.Form onSubmit={handleSubmit}>
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
          <label htmlFor="teachers">Professores (segure Ctrl para selecionar vários)</label>
          <select name="teachers" id="teachers" multiple value={formData.teachers} onChange={handleMultiSelectChange}>
            {availableStaff.teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
            ))}
          </select>
        </S.FormRow>

        <S.FormRow>
          <label htmlFor="tutors">Tutores (segure Ctrl para selecionar vários)</label>
          <select name="tutors" id="tutors" multiple value={formData.tutors} onChange={handleMultiSelectChange}>
            {availableStaff.tutors.map(tutor => (
              <option key={tutor._id} value={tutor._id}>{tutor.name}</option>
            ))}
          </select>
        </S.FormRow>

        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? 'Criando...' : 'Criar Oficina'}
        </Button>
      </S.Form>
    </>
  );
}

export default WorkshopForm;