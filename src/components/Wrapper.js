import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { CssVarsProvider } from '@mui/joy/styles';

import { ConfigurationContext, HassContext } from '../context.js';
import GlobalStyle from './GlobalStyle.js';
import theme from './theme';

const Wrapper = ({ children, panel, hass }) => {
  return (
    <ConfigurationContext.Provider value={panel.config}>
      <HassContext.Provider value={hass}>
        {/* <CssVarsProvider> */}
        <ThemeProvider theme={theme}>
          <>
            <Helmet>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={+true} />
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&display=swap"
                rel="stylesheet"
              ></link>
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            </Helmet>
            {children}
            <GlobalStyle />
          </>
        </ThemeProvider>
        {/* </CssVarsProvider> */}
      </HassContext.Provider>
    </ConfigurationContext.Provider>
  );
};

export default Wrapper;
