import styled, { css } from 'styled-components';

const colors = {
  primary: '#2563EB',
  secondary: '#16A34A',
  tertiary: '#DC2626',
  quaternary: '#8024D1',
  text: '#FFF'
};

const getVariantStyles = (variant) => {
  switch (variant) {
    case 'danger':
    case 'tertiary':
      return css`
        background-color: ${colors.tertiary};
        color: ${colors.text};
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
      `;
    case 'secondary':
      return css`
        background-color: ${colors.secondary};
        color: ${colors.text};
      `;
    case 'quaternary':
      return css`
        background-color: ${colors.quaternary};
        color: ${colors.text};
        width: 100%; 
        font-weight: 600;
      `;
    case 'primary':
    default:
      return css`
        background-color: ${colors.primary};
        color: ${colors.text};
      `;
  }
};

export const StyledButton = styled.button`
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ variant }) => getVariantStyles(variant)}
`;