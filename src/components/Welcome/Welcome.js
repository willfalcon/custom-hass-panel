import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import ButtonBase from '@mui/material/ButtonBase';
import { BsHouseDoorFill, BsLightbulbFill, BsFillShieldFill } from 'react-icons/bs';

import { useHass } from '../../context.js';
import Card from '../Card.js';
import DateWeather from './DateWeather.js';
import Settings from './Settings';
import theme from '../theme.js';
import Chip from './Chip.js';

function timeOfDay() {
  const today = new Date();
  const curHr = today.getHours();

  if (curHr < 12) {
    return 'Morning';
  } else if (curHr < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}

export default function Welcome({ style, setRoute }) {
  const hass = useHass();

  return (
    <WelcomeCard style={style}>
      <DateWeather />
      <Settings url={hass.panels.config.url_path} />
      <span className="heading">Good {timeOfDay()}, Will!</span>
      <div>
        <Chip
          color={theme.blue}
          Icon={BsHouseDoorFill}
          label="House"
          onClick={() => {
            setRoute('house');
          }}
        />
        <Chip
          color={theme.yellow}
          Icon={BsLightbulbFill}
          label="Lights"
          onClick={() => {
            setRoute('lights');
          }}
        />
        <Chip
          color={theme.green}
          Icon={BsFillShieldFill}
          label="Security"
          onClick={() => {
            setRoute('security');
          }}
        />
      </div>
    </WelcomeCard>
  );
}

const WelcomeCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
