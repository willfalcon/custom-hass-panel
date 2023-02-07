import React from 'react';
import styled from 'styled-components';

import { getAngle, getCoords } from './helpers';
import { useThermostat } from './Thermostat';

const Marker = ({ temperature, size, color }) => {
  const { min_temp, max_temp } = useThermostat();
  const angle = getAngle(temperature, min_temp, max_temp);
  const coords = getCoords(angle);

  return <StyledMarker x={coords[0]} y={coords[1]} size={size} color={color} />;
};

export const StyledMarker = styled.span`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
  border: 3px solid ${({ color }) => (color ? color : 'var(--text-color-secondary)')};
  border-radius: 50%;
  left: ${({ x }) => x}px;
  left: 0;
  top: ${({ y }) => y}px;
  top: 0;
  transform: ${({ x, y, size }) => `translateY(${y - size / 2}px) translateX(${x - size / 2}px)`};
  background: var(--card-background);
  z-index: 2;
  transition: 0.15s;
  &.current {
    background: ${({ color }) => (color ? color : 'var(--text-color-secondary)')};
    border: 0;
    z-index: 1;
  }
  &.endpiece {
    background: var(--text-color-secondary);
    border: 0;
    z-index: 1;
  }
`;
export default Marker;
