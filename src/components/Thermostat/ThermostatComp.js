import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';

import Card from '../Card';
import { useHass } from '../../context';
import { prettyize } from '../../lib/utils';
import useDebounce from '../../lib/useDebounce';
import Currents from './Currents';
import ModeSetting from './ModeSetting';
import theme from '../theme';
import Controls from './Controls';
import TargetMarkers from './TargetMarkers';
import Info from './Info';

function toRadians(angle) {
  return (angle * Math.PI) / 180;
}

function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function getCoords(angle) {
  if (!angle) {
    return null;
  }
  const r = 147.5;
  return [round(r * Math.cos(toRadians(angle + 90))), round(r * Math.sin(toRadians(angle + 90)))];
}

function getAngle(temp, min, max) {
  if (!temp) {
    return null;
  }
  const dT = max - min;
  return 2.7 * ((100 * (temp - min)) / dT) + 45;
}

const ThermostatComp = ({ entity, area }) => {
  const { state, attributes, callService } = useHass(entity);
  // console.log(attributes);
  const { state: humidity } = useHass('sensor.hallway_humidity');

  const [mode, setMode] = useState(attributes.preset_mode == 'eco' ? 'eco' : state);
  const currentTemp = attributes.current_temperature;
  const [targetTemp, setTargetTemp] = useState(attributes.temperature);
  const [targetTempHigh, setTargetTempHigh] = useState(attributes.target_temp_high);
  const [targetTempLow, setTargetTempLow] = useState(attributes.target_temp_low);
  console.log({ mode, targetTemp, targetTempHigh, targetTempLow, attributes });
  const minTemp = attributes.min_temp;
  const maxTemp = attributes.max_temp;
  const action = attributes.hvac_action;

  const targetTempAngle = getAngle(targetTemp, minTemp, maxTemp);
  const currentTempAngle = getAngle(currentTemp, minTemp, maxTemp);
  const targetTempHighAngle = getAngle(targetTempHigh, minTemp, maxTemp);
  const targetTempLowAngle = getAngle(targetTempLow, minTemp, maxTemp);

  const targetCoords = getCoords(targetTempAngle);
  const targetHighCoords = getCoords(targetTempHighAngle);
  const targetLowCoords = getCoords(targetTempLowAngle);

  const [currentX, currentY] = getCoords(currentTempAngle);
  const [endX, endY] = getCoords(315);
  const [startX, startY] = getCoords(45);

  const debouncedTargets = useDebounce({ targetTemp, targetTempHigh, targetTempLow }, 5000);

  const [controlMode, setControlMode] = useState(null);

  useEffect(() => {
    async function callClimateService() {
      const {
        targetTemp: debouncedTargetTemp,
        targetTempHigh: debouncedTargetTempHigh,
        targetTempLow: debouncedTargetTempLow,
      } = debouncedTargets;
      try {
        if (mode == 'heat_cool') {
          if (controlMode === 'heat') {
            // await callService('climate', 'set_temperature', {
            //   entity_id: entity,
            //   target_temp_low: debouncedTargetTempLow,
            //   target_temp_high: debouncedTargetTempHigh,
            // });
          }
          if (controlMode === 'cool') {
            // await callService('climate', 'set_temperature', {
            //   entity_id: entity,
            //   target_temp_low: debouncedTargetTempLow,
            //   target_temp_high: debouncedTargetTempHigh,
            // });
          }
        } else {
          // await callService('climate', 'set_temperature', {
          //   entity_id: entity,
          //   temperature: debouncedTargetTemp,
          // });
        }
      } catch (err) {
        console.log(err);
        setTargetTemp(attributes.temperature);
        setTargetTempHigh(attributes.target_temp_high);
        setTargetTempLow(attributes.target_temp_low);
      }
    }
    callClimateService();
  }, [debouncedTargets]);

  useEffect(() => {
    console.log('running this effect');
    if (targetTempHigh !== attributes.target_temp_high) {
      console.log('target temp highs dont match');
      setTargetTempHigh(attributes.target_temp_high);
    }
    if (targetTempLow !== attributes.target_temp_low) {
      console.log('target temp lows dont match');
      setTargetTempLow(attributes.target_temp_low);
    }
    if (targetTemp !== attributes.temperature) {
      console.log('target temp doesnt match');
      setTargetTemp(attributes.temperature);
    }
  }, [mode, attributes.temperature, attributes.target_temp_high, attributes.target_temp_low]);

  const status = action === 'idle' ? `${prettyize(mode == 'heat_cool' ? 'heat/Cool' : `${state}ing`)} set to` : `${prettyize(state)}ing`;
  const color = mode == 'heat' ? theme.heat : mode == 'cool' ? theme.cool : mode == 'eco' ? theme.green : '';

  return (
    <Card style={{ gridArea: area, display: 'block' }}>
      <Thermostat className="thermostat" mode={mode} color={color}>
        <div className="inner-mask" />

        <Info
          mode={mode}
          status={status}
          color={color}
          targetTemp={targetTemp}
          targetTempHigh={targetTempHigh}
          targetTempLow={targetTempLow}
          setControlMode={setControlMode}
          controlMode={controlMode}
        />

        <div className="marker-wrapper">
          <TargetMarkers targetCoords={targetCoords} highCoords={targetHighCoords} lowCoords={targetLowCoords} mode={mode} color={color} />
          <Marker className="marker current" x={currentX} y={currentY} size={10} color={color} />
          <Marker className="marker endpiece" x={startX} y={startY} size={5} />
          <Marker className="marker endpiece" x={endX} y={endY} size={5} />
        </div>

        {action != 'idle' && <div className="gradient" />}

        <Controls
          setTargetTemp={setTargetTemp}
          mode={mode}
          controlMode={controlMode}
          setTargetTempHigh={setTargetTempHigh}
          setTargetTempLow={setTargetTempLow}
        />
      </Thermostat>

      <Currents currentTemp={currentTemp} humidity={humidity} />

      <ModeSetting mode={mode} callService={callService} action={action} entity={entity} setMode={setMode} />
    </Card>
  );
};

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 30px;
  font-weight: 300;
  border: 1px solid var(--text-color-secondary);
  background: var(--card-background);
  cursor: pointer;
`;

const Thermostat = styled.div`
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

export const Marker = styled.span`
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

export default ThermostatComp;
