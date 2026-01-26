import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color: ${({ theme }) => theme.textPrimary};
    background-color: ${({ theme }) => theme.bgPrimary};
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    background-color: ${({ theme }) => theme.bgPrimary};
  }

  #root {
    min-height: 100vh;
  }
`;


