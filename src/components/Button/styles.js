import styled, { css } from 'styled-components';

const getVariantStyles = (variant = 'primary') => {
  switch (variant) {
    case 'secondary':
      return css`
        background-color: #16A34A;
      `;
    case 'tertiary':
      return css`
        background-color: #DC2626;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'quaternary':
      return css`
        background-color: #8024D1;
        width: 100%;
        font-weight: 600;
      `;
    case 'primary':
    default:
      return css`
        background-color: #2563EB;
      `;
  }
};

export const StyledButton = styled.button`
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  color: white;
  opacity: 1;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ variant }) => getVariantStyles(variant)}
`;