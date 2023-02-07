import React from 'react';
import styled from 'styled-components';

import { useHass } from '../../context';

const Currents = ({ currentTemp }) => {
  const { state: humidity } = useHass('sensor.hallway_humidity');
  return (
    <StyledCurrents className="currents">
      <div className="temp">
        <span>Indoor</span>
        <span>{currentTemp}</span>
      </div>
      <div className="humidity">
        <span>Humidity</span>
        <span>{humidity}%</span>
      </div>
    </StyledCurrents>
  );
};

const StyledCurrents = styled.div`
  text-align: center;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  column-gap: 20px;
  span {
    display: block;
    &:last-child {
      font-weight: 600;
      font-size: 20px;
    }
  }
`;

export default Currents;
