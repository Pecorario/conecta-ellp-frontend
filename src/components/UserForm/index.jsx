import React, { useState, useEffect, useRef } from 'react';
import api from '@/services/api.js';
import { useAuth } from '@/hooks/useAuth.js';
import { useLoading } from '@/hooks/useLoading.js';
import Button from '@/components/Button';
import { IMaskInput } from 'react-imask';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import { isValidCPF } from '@/utils/validators.js';
import * as S from './styles.js';

const initialFormData = {
  name: '',
  email: '',
  age: '',
  password: '',
  type: 'student',
  volunteerData: {
    birthDate: '',
    cpf: '',
    nationality: '',
    isStudentUTFPR: false,
    course: '',
    semester: '',
    ra: '',
    address: '',
    city: '',
    state: '',
    phone: '',
  }
};

function UserForm({ onSuccess, userToEdit }) {
  const { user: loggedInUser } = useAuth();
  const { isLoading, showLoader, hideLoader } = useLoading();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const formRef = useRef(null);

  const isEditing = !!userToEdit;
  const isVolunteerType = formData.type === 'teacher' || formData.type === 'tutor';

  useEffect(() => {
    if (isEditing && userToEdit) {
      setFormData({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        age: userToEdit.age || '',
        password: '',
        type: userToEdit.type || 'student',
        volunteerData: {
          birthDate: userToEdit.volunteerData?.birthDate || '',
          cpf: userToEdit.volunteerData?.cpf || '',
          nationality: userToEdit.volunteerData?.nationality || '',
          isStudentUTFPR: userToEdit.volunteerData?.isStudentUTFPR || false,
          course: userToEdit.volunteerData?.course || '',
          semester: userToEdit.volunteerData?.semester || '',
          ra: userToEdit.volunteerData?.ra || '',
          address: userToEdit.volunteerData?.address || '',
          city: userToEdit.volunteerData?.city || '',
          state: userToEdit.volunteerData?.state || '',
          phone: userToEdit.volunteerData?.phone || '',
        }
      });
    } else {
      setFormData(initialFormData);
    }
    setStep(1);
    setErrors({});
  }, [userToEdit, isEditing]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData(prevData => ({ ...prevData, [name]: finalValue }));
  };
  
  const handleVolunteerDataChange = (event) => {
    const { name, value, type, checked } = event.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData(prevData => ({
      ...prevData,
      volunteerData: { ...prevData.volunteerData, [name]: finalValue }
    }));
  };

  const handleBirthDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      volunteerData: { ...prev.volunteerData, birthDate: date[0] }
    }));
  };

  const validateStep2 = () => {
    const newErrors = {};
    const { cpf, phone } = formData.volunteerData;

    if (isVolunteerType) {
      const cpfDigits = cpf.replace(/[^\d]/g, '');
      if (cpfDigits.length > 0 && !isValidCPF(cpf)) {
        newErrors.cpf = 'CPF inválido.';
      }

      const phoneDigits = phone.replace(/[^\d]/g, '');
      if (phoneDigits.length > 0 && phoneDigits.length < 10) {
        newErrors.phone = 'Telefone inválido.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (event) => {
    event.preventDefault(); 
    if (formRef.current?.checkValidity()) {
      setStep(2);
    } else {
      formRef.current?.reportValidity();
    }
  };
  
  const handlePrevStep = (event) => {
    event.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    if (isVolunteerType && step === 2 && !validateStep2()) {
      return;
    }

    setErrors({});
    showLoader();

    try {
      let response;
      if (isEditing) {
        const { password, ...dataToUpdate } = formData;
        // Não precisamos mais do 'payload', enviamos o objeto todo
        response = await api.patch(`/users/${userToEdit._id}`, dataToUpdate);
      } else {
        response = await api.post('/users', formData);
      }
      onSuccess(response.data);
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Ocorreu um erro.' });
    } finally {
      hideLoader();
    }
  };

  const canCreateRole = (role) => {
    if (loggedInUser?.type === 'admin') return true;
    if (loggedInUser?.type === 'teacher' && (role === 'teacher' || role === 'tutor' || role === 'student')) return true;
    return false;
  };

  return (
    <>
      <S.FormHeader>
        <h2>{isEditing ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
        <p>{isEditing ? 'Altere os dados do usuário abaixo.' : 'Preencha os dados para criar uma nova conta.'}</p>
      </S.FormHeader>
      
      <S.Form ref={formRef} onSubmit={handleSubmit} noValidate>
        {step === 1 && (
          <>
            <S.FormRow>
              <label htmlFor="name">Nome completo</label>
              <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} />
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} />
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="age">Idade</label>
              <input type="number" name="age" id="age" required value={formData.age} onChange={handleChange} />
            </S.FormRow>
            {!isEditing && (
              <S.FormRow>
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" id="password" minLength="4" required value={formData.password} onChange={handleChange} />
              </S.FormRow>
            )}
            <S.FormRow>
              <label htmlFor="type">Tipo de Usuário</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange}>
                <option value="student">Aluno</option>
                {canCreateRole('tutor') && <option value="tutor">Tutor</option>}
                {canCreateRole('teacher') && <option value="teacher">Professor</option>}
                {canCreateRole('admin') && <option value="admin">Administrador</option>}
              </select>
            </S.FormRow>
          </>
        )}

        {step === 2 && isVolunteerType && (
          <>
            <S.FormRow>
              <label htmlFor="birthDate">Data de Nascimento</label>
              <Flatpickr
                value={formData.volunteerData.birthDate}
                onChange={handleBirthDateChange}
                options={{ locale: Portuguese, dateFormat: 'Y-m-d' }}
                render={({ value, ...props }, ref) => (
                  <input {...props} ref={ref} placeholder="DD/MM/AAAA" />
                )}
              />
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="cpf">CPF</label>
              <IMaskInput
                mask="000.000.000-00"
                id="cpf"
                name="cpf"
                value={formData.volunteerData.cpf}
                onAccept={(value) => handleVolunteerDataChange({ target: { name: 'cpf', value } })}
              />
              {errors.cpf && <S.ErrorMessage>{errors.cpf}</S.ErrorMessage>}
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="phone">Celular</label>
              <IMaskInput
                mask="(00) 00000-0000"
                id="phone"
                name="phone"
                value={formData.volunteerData.phone}
                onAccept={(value) => handleVolunteerDataChange({ target: { name: 'phone', value } })}
              />
              {errors.phone && <S.ErrorMessage>{errors.phone}</S.ErrorMessage>}
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="nationality">Nacionalidade</label>
              <input type="text" name="nationality" id="nationality" value={formData.volunteerData.nationality} onChange={handleVolunteerDataChange} />
            </S.FormRow>
            <S.FormRow>
              <label>
                <input type="checkbox" name="isStudentUTFPR" checked={formData.volunteerData.isStudentUTFPR} onChange={handleVolunteerDataChange} style={{ width: 'auto', marginRight: '0.5rem' }}/>
                É estudante da UTFPR?
              </label>
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="course">Curso</label>
              <input type="text" name="course" id="course" value={formData.volunteerData.course} onChange={handleVolunteerDataChange} />
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="semester">Semestre</label>
              <input type="text" name="semester" id="semester" value={formData.volunteerData.semester} onChange={handleVolunteerDataChange} />
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="ra">RA</label>
              <input type="text" name="ra" id="ra" value={formData.volunteerData.ra} onChange={handleVolunteerDataChange} />
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="address">Endereço</label>
              <input type="text" name="address" id="address" value={formData.volunteerData.address} onChange={handleVolunteerDataChange} />
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="city">Cidade</label>
              <input type="text" name="city" id="city" value={formData.volunteerData.city} onChange={handleVolunteerDataChange} />
            </S.FormRow>
            <S.FormRow>
              <label htmlFor="state">Estado</label>
              <input type="text" name="state" id="state" value={formData.volunteerData.state} onChange={handleVolunteerDataChange} />
            </S.FormRow>
          </>
        )}

        {errors.api && <p style={{ color: '#ef4444', textAlign: 'center' }}>{errors.api}</p>}
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {step === 2 && (
            <Button variant="quaternary" type="button" onClick={handlePrevStep}>
              Voltar
            </Button>
          )}

          {isVolunteerType && step === 1 ? (
            <Button variant="primary" type="button" onClick={handleNextStep}>
              Avançar
            </Button>
          ) : (
            <Button variant="secondary" type="submit" disabled={isLoading}>
              Salvar
            </Button>
          )}
        </div>
      </S.Form>
    </>
  );
}

export default UserForm;