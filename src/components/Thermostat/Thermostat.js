import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import Card from '../Card';
import { useHass } from '../../context';
import Info from './Info';
import Controls from './Controls';
import Currents from './Currents';
import ModeSetting from './ModeSetting';
import Marker from './Marker';
import TargetMarkers from './TargetMarkers';
import theme from '../theme';

const ThermostatContext = React.createContext();
export const useThermostat = () => useContext(ThermostatContext);

const Thermostat = ({ entity, area }) => {
  const { state, attributes, callService } = useHass(entity);

  const { current_temperature, min_temp, max_temp } = attributes;
  const mode = attributes.preset_mode == 'eco' ? 'eco' : state;
  const color = mode == 'heat' ? theme.heat : mode == 'cool' ? theme.cool : mode == 'eco' ? theme.green : '';

  const [controlMode, setControlMode] = useState(null);
  return (
    <ThermostatContext.Provider value={{ mode, ...attributes, callService, entity, controlMode, setControlMode }}>
      <Card style={{ gridArea: area, display: 'block' }}>
        <StyledThermostat mode={mode}>
          <div className="inner-mask" />
          <Info />

          <div className="marker-wrapper">
            <TargetMarkers color={color} />
            <Marker className="marker current" temperature={current_temperature} size={10} color={color} />
            <Marker className="marker endpiece" temperature={min_temp} size={5} />
            <Marker className="marker endpiece" temperature={max_temp} size={5} />
          </div>
          <Controls />
        </StyledThermostat>

        <Currents currentTemp={attributes.current_temperature} />

        <ModeSetting />
      </Card>
    </ThermostatContext.Provider>
  );
};

const StyledThermostat = styled.div`
  --heat: #ff8235;
  --cool: #0069fd;
  --size: 300px;
  background: var(--text-color-secondary);
  height: var(--size);
  width: var(--size);
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  position: relative;
  margin-top: 20px;

  .gradient {
    width: 75%;
    height: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    ${({ mode, theme }) =>
      mode == 'heat'
        ? `
        background-image: radial-gradient(${rgba(theme.heat, 0.5)}, ${rgba(theme.heat, 0)} 70%);
      `
        : mode == 'cool'
        ? `
        background-image: radial-gradient(${rgba(theme.cool, 0.5)}, ${rgba(theme.cool, 0)} 70%);
      `
        : 'display: none;'}
  }

  .marker-wrapper {
    position: absolute;
    width: 50%;
    left: 50%;
    height: 50%;
    top: 50%;
  }

  .inner-mask {
    width: calc(var(--size) - 10px);
    height: calc(var(--size) - 10px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: var(--card-background);
  }

  .target-temp {
    font-size: 60px;
  }

  .controls {
    position: absolute;
    width: 209px;
    padding: 10px 25px;
    background: var(--card-background);
    left: 50%;
    transform: translateX(-50%);
    top: 240px;
    display: flex;
    justify-content: space-around;
  }
`;

export default Thermostat;
