import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./theme";

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.background};
    font-family: ${({ theme }) => theme.fontFamily};;
  }
`;
