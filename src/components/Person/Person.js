import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import { useHass } from '../../context';
import Battery from './Battery';
import { prettyize } from '../../lib/utils';

const Person = ({ entity }) => {
  const person = useHass(entity);
  const hass = useHass();
  const { state, attributes } = person;
  return (
    <PersonCard>
      <img className="picture" src={attributes.entity_picture} alt={attributes.friendly_name} />
      <span className="label">{attributes.friendly_name}</span>
      <span className="state">{prettyize(state)}</span>
      <Battery entity={attributes.source} />
    </PersonCard>
  );
};

const PersonCard = styled(Card)`
  align-items: center;
  grid-template-columns: 50px 1fr;
  align-items: center;
  position: relative;
  .picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    grid-area: icon;
  }
`;

export default Person;
