import React, { useContext } from 'react';

export const ConfigurationContext = React.createContext();
export const HassContext = React.createContext();

export const useHass = (entity = false) => {
  const hass = useContext(HassContext);

  if (entity) {
    const { states, callService } = hass;
    return { ...states[entity], callService };
  }
  return hass;
};
