import styled from 'styled-components';

export const ScreenContainer = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const FixedSection = styled.div`
  padding: 1.5rem 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-shrink: 0;
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 2rem;

  scrollbar-width: thin;
  scrollbar-color: #1E293B transparent;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1E293B;
    border-radius: 20px;
  }
`;

export const ScreenTitle = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFF;
  }
`;

export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ProfileSection = styled.section`
  background: #1E293B;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-content: start;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #E0E4E8;
  padding-bottom: 1rem;
  border-bottom: 1px solid #334155;
  margin-bottom: 0.5rem;
`;

export const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 0.875rem;
`;