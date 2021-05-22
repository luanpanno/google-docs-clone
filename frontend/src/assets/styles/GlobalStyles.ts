import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  html, body {
    width: 100%;
    height: 100%;

    &, *{
      font-family: sans-serif;
      box-sizing: border-box;
      outline: 0;
    }
  }

  @media print {
    body {
      background-color: none;
    }
  }
`;
