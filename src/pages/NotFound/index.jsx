import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import * as S from './styles.js';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Title>404</S.Title>
      <S.Subtitle>Página não encontrada</S.Subtitle>
      <S.Text>
        Desculpe, não conseguimos encontrar a página que você está procurando. 
        Ela pode ter sido removida ou o link pode estar incorreto.
      </S.Text>
      
      <S.ButtonWrapper>
        <Button variant="primary" onClick={() => navigate('/')}>
          Voltar para o Início
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default NotFoundPage;