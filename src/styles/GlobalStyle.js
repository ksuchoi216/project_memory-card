import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');

  * {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
  }
  
  h1 {
    font-size: 34px;
  }
  
  input {
    margin: 4px;
    padding: 4px;
    width: 400px;
    font-size: 18px;
  }
  
  button {
    padding: 4px;
    width: 100px;
  }
  
  .buttonWapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
  }

  `;

export default GlobalStyle;
