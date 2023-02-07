import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
  --max-width: 1100px;
  --border-radius: 12px;
  --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
    'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
    'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
  --border-radius: 20px;
  --box-shadow: 0 2px 4px 0 rgba(0,0,0,.19);
  --background-color: #efefef;
  --card-background: white;
  --text-color: black;
  --text-color-secondary: #A3A3A3;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #121212;
    --card-background: #1D1D1D;
    --text-color: #DDDDDD;
    --box-shadow: none;
    --box-shadow-override: 0 2px 4px rgba(0,0,0,.80);
    --text-color-secondary: #6A6A6A;
  }
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}


body {
  background: var(--background-color);
  font-family: 'Roboto', sans-serif;
}

button {
  font-family: 'Roboto', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

`;

export default GlobalStyle;
