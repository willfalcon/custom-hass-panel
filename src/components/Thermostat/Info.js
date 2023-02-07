import React from 'react';
import styled from 'styled-components';

import theme from '../theme';
import { prettyize } from '../../lib/utils';
import { useThermostat } from './Thermostat';

const Info = () => {
  const { hvac_action, temperature, target_temp_high, target_temp_low, mode, controlMode, setControlMode } = useThermostat();

  const status = hvac_action === 'idle' ? `${prettyize(mode == 'heat_cool' ? 'heat/Cool' : `${mode}ing`)} set to` : `${prettyize(mode)}ing`;

  const color = mode == 'heat' ? theme.heat : mode == 'cool' ? theme.cool : mode == 'eco' ? theme.green : '';
  return (
    <CenterInfo className="center-info" color={color} controlMode={controlMode}>
      {mode !== 'eco' && <span className="mode">{status}</span>}
      {temperature ? (
        <span className="target-temp">{mode === 'eco' ? 'Eco' : temperature}</span>
      ) : (
        <>
          <span
            className="target-temp temp-low"
            onClick={() => {
              setControlMode('heat');
            }}
          >
            {target_temp_low}
          </span>
          <span
            className="target-temp temp-high"
            onClick={() => {
              setControlMode('cool');
            }}
          >
            {target_temp_high}
          </span>
        </>
      )}
    </CenterInfo>
  );
};

const CenterInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  column-gap: 10px;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => (color ? color : 'inherit')};
  transition: 0.5s;
  text-align: center;
  z-index: 1;
  .mode {
    flex: 0 0 100%;
  }
  .temp-low {
    transition: 0.25s;
    color: ${({ theme }) => theme.heat};
    opacity: ${({ controlMode }) => (controlMode == 'heat' ? 1 : 0.5)};
  }
  .temp-high {
    transition: 0.25s;
    color: ${({ theme }) => theme.cool};
    opacity: ${({ controlMode }) => (controlMode == 'cool' ? 1 : 0.5)};
  }
`;

export default Info;
