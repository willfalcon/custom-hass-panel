import React from 'react';

import Welcome from './Welcome/Welcome.js';
import Person from './Person/Person.js';
import Thermostat from './Thermostat/Thermostat.js';

const MainColumn = ({ setRoute, style }) => {
  return (
    <main style={style}>
      <Welcome style={{ gridArea: 'welcome' }} setRoute={setRoute} />
      <Person entity="person.anna_hawks" area="anna" />
      <Person entity="person.will_hawks" area="will" />
      <Thermostat entity="climate.hallway" area="thermostat" />
    </main>
  );
};

export default MainColumn;
