import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Tahoma, Verdana, Helvetica, sans-serif;
    font-weight: 450;
    background-color: ${(props) => props.theme.third};
    color: #1F1C1C;
  }
`;

const theme = {
  primary: "#D31119",
  secondary: "#006ef5",
  third: "#fff6f4",
  fourth: "#d4c5ae",
  fifth: "#ede9d0",
  sixth: "#1F1C1C",
  success: "#00B33E",
  danger: "#D31119",
};
export { theme };
