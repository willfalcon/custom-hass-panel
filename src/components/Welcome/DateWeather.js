import React from 'react';
import { IoSunnyOutline, IoPartlySunnySharp, IoCloudyOutline, IoRainyOutline } from 'react-icons/io5';
import { MdOutlineModeNight } from 'react-icons/md';
import { BsCloudFog2, BsCloudHail, BsCloudLightningRain, BsCloudLightning } from 'react-icons/bs';

import styled from 'styled-components';
import { useHass } from '../../context';

import Card from '../Card';

function weatherIcon(weather) {
  switch (weather) {
    case 'sunny':
      return <IoSunnyOutline />;
    case 'partlycloudy':
      return <IoPartlySunnySharp />;
    case 'cloudy':
      return <IoCloudyOutline />;
    case 'rainy':
      return <IoRainyOutline />;
    case 'clear-night':
      return <MdOutlineModeNight />;
    case 'fog':
      return <BsCloudFog2 />;
    case 'hail':
      return <BsCloudHail />;
    case 'lightning':
      return <BsCloudLightning />;
    case 'lightning-rainy':
      return <BsCloudLightningRain />;
  }
}

export default function DateWeather() {
  const now = new Date();
  const hass = useHass();
  const state = hass.states['weather.forecast_home'];

  return (
    <Button className="date">
      {weatherIcon(state.state)}
      <span className="date__date">{`${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}`}</span>
    </Button>
  );
}

const Button = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  /* width: 150px; */
  box-shadow: var(--box-shadow-override);
  background:: var(--background);
  text-align: center;
  display: inline-flex;
  align-items: center;

  .date {
    &__date {
      font-weight: 700;
      margin-left: 5px;
    }
  }
`;
