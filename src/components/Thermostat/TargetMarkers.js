import React from 'react';

import theme from '../theme';
import { useThermostat } from './Thermostat';
import Marker from './Marker';

const TargetMarkers = ({ color }) => {
  const { mode, temperature, target_temp_high, target_temp_low } = useThermostat();

  if (mode === 'eco') {
    return null;
  }

  if (temperature) {
    return <Marker temperature={temperature} size={30} color={color} />;
  } else {
    return (
      <>
        {target_temp_high && <Marker temperature={target_temp_high} size={30} color={theme.cool} />}
        {target_temp_low && <Marker temperature={target_temp_low} size={30} color={theme.heat} />}
      </>
    );
  }
};

export default TargetMarkers;
