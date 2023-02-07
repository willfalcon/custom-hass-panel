import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import Root from './Root';
import styled from 'styled-components';

import Light from './Light/Light.js';

import { ConfigurationContext, HassContext } from '../context.js';
import Welcome from './Welcome.js';
import GlobalStyle from './GlobalStyle.js';

export function Provider({ hass, showMenu, narrow, panel }) {
  return (
    <ConfigurationContext.Provider value={panel.config}>
      <HassContext.Provider value={hass}>
        <>
          <Main>
            <Welcome style={{ gridArea: 'welcome' }} />
            <Light entity="light.office_desk_lamp" area="light1" />
            <Light entity="light.office_piano_lamp" area="light2" />
          </Main>
          <GlobalStyle />
        </>
      </HassContext.Provider>
    </ConfigurationContext.Provider>
  );
}

const Main = styled.main`
  padding: 2rem;
  width: 600px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'welcome welcome'
    'light1 light2';
`;
