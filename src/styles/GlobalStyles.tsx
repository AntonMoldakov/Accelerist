import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyles = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Rubik', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
}
a {
  color: ${colors.black};
  text-decoration: none;
}
p {
  margin: 0;
}
 
h1,h2,h3,h4,h5,h6 {
  margin: 0; 
}

* {
  box-sizing: border-box;
}
`;
