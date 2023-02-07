import React from 'react';
import styled from 'styled-components';
import { animated, useTransition } from '@react-spring/web';
import { BsDoorClosed, BsDoorOpen } from 'react-icons/bs';

import Card from '../Card';
import { useHass } from '../../context';

const Door = ({ entity }) => {
  const { state, attributes } = useHass(entity);
  const iconTransition = useTransition(state == 'Open', {
    from: {
      opacity: 0,
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <Card>
      {iconTransition((styles, item) =>
        item ? (
          <Icon style={styles}>
            <BsDoorOpen />
          </Icon>
        ) : (
          <Icon style={styles}>
            <BsDoorClosed />
          </Icon>
        )
      )}
      <span className="label">{attributes.friendly_name}</span>
      <span className="state">{state.capitalize()}</span>
    </Card>
  );
};

const Icon = styled(animated.div)`
  width: 42px;
  height: 42px;
  background: rgba(27, 28, 25, 0.04);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: icon;
  svg {
    width: 24px;
    height: 24px;
    opacity: 0.65;
  }
`;

export default Door;
