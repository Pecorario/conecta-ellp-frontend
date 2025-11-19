import React, { useState } from 'react';
import api from '@/services/api.js';
import { useAuth } from '@/hooks/useAuth.js';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as S from './styles.js';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      toast.error('As senhas não conferem.');
      return;
    }

    if (isLoading) return;
    
    setIsLoading(true);
    setError('');

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        age: Number(age),
        type: 'student'
      });
      
      toast.success('Conta criada com sucesso! Entrando...');
      await handleLogin({ email, password });
      navigate('/');
      
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Erro ao criar conta.';
      setError(message);
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
          <p>Crie sua conta de aluno</p>
        </S.FormHeader>

        <S.Form onSubmit={handleSubmit}>
          <S.ScrollableInputs>
            <S.FormRow>
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </S.FormRow>

            <S.FormRow>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </S.FormRow>

            <S.FormRow>
              <label htmlFor="age">Idade</label>
              <input
                type="number"
                id="age"
                placeholder="Sua idade"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </S.FormRow>

            <S.FormRow>
              <label htmlFor="password">Senha</label>
              <S.PasswordWrapper>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="4"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </S.PasswordWrapper>
            </S.FormRow>

            <S.FormRow>
              <label htmlFor="confirmPassword">Repetir Senha</label>
              <S.PasswordWrapper>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength="4"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex="-1">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </S.PasswordWrapper>
            </S.FormRow>

            {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}
          </S.ScrollableInputs>

          <S.FormFooter>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Cadastrar'}
            </Button>

            <S.FormSpan>
              Já tem uma conta? <Link to="/login">Fazer Login</Link>
            </S.FormSpan>
          </S.FormFooter>
        </S.Form>
      </S.FormSection>
    </S.MainContainer>
  );
}

export default RegisterPage;