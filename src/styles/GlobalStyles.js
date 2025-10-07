import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    color: white;
  }

  @media (prefers-reduced-motion: no-preference) {
    html {
      interpolate-size: allow-keywords;
    }
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  p {
    text-wrap: pretty;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }

  #root {
    isolation: isolate;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  button {
    background: transparent;
    margin: 0;
    border: 0;
    cursor: pointer;
  }

  body {
    background: linear-gradient(90deg, #1E293B, #0F172A);
    width: 100%;
    max-width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  body:has(.header) {
    background: #0F172A;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: #e5e7eb;
    box-shadow: 0 0 0px 1000px #1e1e1e inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  ::placeholder {
    color: #b5b5b5;
  }

  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  @media (max-width: 767px) , (max-height: 767px) {
    :root {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    :root {
      font-size: 12px;
    }
  }

  @media (max-width: 360px) {
    :root {
      font-size: 10px;
    }
  }
`;

export default GlobalStyles;