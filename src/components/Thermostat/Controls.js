import React from 'react';
import IconButton from '@mui/material/IconButton';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { useThermostat } from './Thermostat';

const Controls = () => {
  const { callService, temperature, entity, mode, controlMode, target_temp_low, target_temp_high } = useThermostat();

  const handleDown = () => {
    if (mode === 'heat_cool') {
      if (controlMode === 'heat') {
        callService('climate', 'set_temperature', {
          entity_id: entity,
          target_temp_low: target_temp_low - 1,
          target_temp_high,
        });
      }
      if (controlMode === 'cool') {
        callService('climate', 'set_temperature', {
          entity_id: entity,
          target_temp_high: target_temp_high - 1,
          target_temp_low,
        });
      }
    } else {
      callService('climate', 'set_temperature', {
        entity_id: entity,
        temperature: temperature - 1,
      });
    }
  };

  const handleUp = () => {
    if (mode === 'heat_cool') {
      if (controlMode === 'heat') {
        callService('climate', 'set_temperature', {
          entity_id: entity,
          target_temp_low: target_temp_low + 1,
          target_temp_high,
        });
      }
      if (controlMode === 'cool') {
        callService('climate', 'set_temperature', {
          entity_id: entity,
          target_temp_high: target_temp_high + 1,
          target_temp_low,
        });
      }
    } else {
      callService('climate', 'set_temperature', {
        entity_id: entity,
        temperature: temperature + 1,
      });
    }
  };

  return (
    <div className="controls">
      <IconButton aria-label="Temperature Down" onClick={handleDown}>
        <FaMinus />
      </IconButton>
      <IconButton aria-label="Temperature Up" onClick={handleUp}>
        <FaPlus />
      </IconButton>
    </div>
  );
};

export default Controls;
