import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 6rem;
  font-weight: 800;
  color: #2563EB;
  margin: 0;
  line-height: 1;
  
  text-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const Subtitle = styled.h2`
  font-size: 2rem;
  color: #FFF;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const Text = styled.p`
  color: #94A3B8;
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  max-width: 500px;
  line-height: 1.6;
`;

export const ButtonWrapper = styled.div`
  min-width: 200px;
`;