import React, { useState } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { CssVarsProvider } from '@mui/joy/styles';
import styled from 'styled-components';
import { useTransition, animated } from '@react-spring/web';
import { BsUnlockFill, BsLockFill } from 'react-icons/bs';

import { useHass } from '../../context';
import Card from '../Card';
import theme from '../theme';

const Lock = ({ entity }) => {
  const { state, attributes, callService } = useHass(entity);

  const [locked, setLocked] = useState(false);

  const iconTransition = useTransition(state == 'locked', {
    from: {
      opacity: 0,
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <LockCard state={state}>
      <span className="label">{attributes.friendly_name}</span>
      <ButtonBase
        variant="plain"
        onClick={() => {
          if (state == 'locked') {
            callService('lock', 'unlock', { entity_id: entity });
          } else {
            callService('lock', 'lock', { entity_id: entity });
          }
        }}
      >
        {iconTransition((styles, item) =>
          item ? (
            <Icon style={styles} className="locked">
              <BsLockFill />
            </Icon>
          ) : (
            <Icon style={styles} className="unlocked">
              <BsUnlockFill />
            </Icon>
          )
        )}
      </ButtonBase>
    </LockCard>
  );
};

const LockCard = styled(Card)`
  grid-column: span 2;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'label'
    'button';
  justify-content: center;
  button {
    grid-area: button;
    width: 175px;
    height: 175px;
    margin: 20px 0;
    justify-self: center;
    padding: 20px;
    background: rgba(27, 28, 25, 0.04);
    border-radius: 50%;
    position: relative;
    border: 15px solid ${({ theme }) => theme.yellow};
  }
  svg {
    width: 100px;
    height: 100px;
    color: ${({ state, theme }) => (state == 'locked' ? theme.green : theme.yellow)};
  }
`;

const Icon = styled(animated.div)`
  width: 100px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
  top: 20px;

  &.unlocked {
    transform: translateX(12px);
  }
`;

export default Lock;
