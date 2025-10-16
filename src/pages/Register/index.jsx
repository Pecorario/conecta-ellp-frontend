import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/services/api.js';
import Button from '@/components/Button';
import * as S from './styles.js';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    setError('');
    setIsLoading(true);

    try {
      await api.post('/auth/register', formData);
      navigate('/login'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar conta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.MainContainer>
      <S.FormSection>
        <S.FormHeader>
          <img src="/images/logo.svg" alt="Logo" />
          <h1>ConectaELLP</h1>
          <p>Plataforma de Ensino Lúdico</p>
        </S.FormHeader>

        <S.Form onSubmit={handleSubmit}>
          <S.FormRow>
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Seu nome completo"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </S.FormRow>

          <S.FormRow>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="seu@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </S.FormRow>

          <S.FormRow>
            <label htmlFor="age">Idade</label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Sua idade"
              required
              value={formData.age}
              onChange={handleChange}
            />
          </S.FormRow>

          <S.FormRow>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              minLength="4"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </S.FormRow>

          {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

          <Button
            variant="secondary"
            type="submit"
            disabled={isLoading}
          >
            Cadastrar como aluno
          </Button>
        </S.Form>

        <S.FormSpan>
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </S.FormSpan>
      </S.FormSection>
    </S.MainContainer>
  );
}

export default RegisterPage;