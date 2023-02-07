import React, { useState } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import Root from './Root';
import { useTransition } from '@react-spring/web';
import styled from 'styled-components';

import Wrapper from './Wrapper';
import { media } from './theme.js';
import MainColumn from './MainColumn';
import Lights from './Lights';
import House from './House';
import Security from './Security';

export function Dashboard({ hass, showMenu, narrow, panel }) {
  const [route, setRoute] = useState('security');

  const routeTransition = useTransition(route, {
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(-100%)', opacity: 0 },
  });
  return (
    <Wrapper hass={hass} panel={panel}>
      <Layout home={!route || route == 'house'}>
        <MainColumn setRoute={setRoute} style={{ zIndex: 1, position: 'relative' }} />
        <div style={{ position: 'relative', zIndex: 0 }}>
          {routeTransition((styles, item) => {
            switch (item) {
              case 'lights':
                return <Lights styles={styles} />;
              case 'security':
                return <Security styles={styles} />;
              default:
                return null;
            }
          })}
        </div>
      </Layout>
    </Wrapper>
  );
}

const Layout = styled.div`
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  > div {
    flex-grow: 1;
  }
  main {
    width: 600px;
    max-width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'welcome welcome'
      'light1 light2'
      'anna will'
      'doors-label doors-label'
      'door1 door2'
      'door3 door4'
      'thermostat thermostat';
    gap: 10px;

    ${media.break`
    padding: 2rem;
    `}
  }
`;
