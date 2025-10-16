import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';
import Button from '@/components/Button';
import * as S from './styles.js';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  const { handleLogin } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;
    
    setError(''); 
    try {
      await handleLogin({ email, password });
      navigate('/'); 
    } catch (err) {
      setError(err.message);
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
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="seu@email.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </S.FormRow>

          {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

          <Button variant="primary" type="submit">
            Entrar
          </Button>
        </S.Form>

        <S.FormSpan>
          Não tem uma conta? <Link to="/register">Cadastre-se como aluno</Link>
        </S.FormSpan>
      </S.FormSection>
    </S.MainContainer>
  );
}

export default LoginPage;