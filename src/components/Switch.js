import React from 'react';
import { animated, useTransition } from '@react-spring/web';
import { rgba } from 'polished';
import styled from 'styled-components';
import { MdLightbulb, MdLightbulbOutline } from 'react-icons/md';
import { useHass } from '../context';
import ButtonBase from '@mui/material/ButtonBase';

import { LightCard, Icon } from './Light/Light';
import theme from './theme';

const Switch = ({ entity, style, area }) => {
  const { state, attributes, callService } = useHass(entity);
  const iconTransition = useTransition(state == 'on', {
    from: {
      opacity: 0,
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <LightCard styles={{ ...style, gridArea: area }} state={state} color={theme.yellow}>
      <ButtonBase
        onClick={() => {
          callService('switch', 'toggle', {
            entity_id: entity,
          });
        }}
      >
        {iconTransition((styles, item) =>
          item ? (
            <Icon style={styles}>
              <MdLightbulbOutline />
            </Icon>
          ) : (
            <Icon style={styles}>
              <MdLightbulb />
            </Icon>
          )
        )}
      </ButtonBase>
      <span className="label">{attributes.friendly_name}</span>
      <span className="state">{state.capitalize()}</span>
    </LightCard>
  );
};

export default Switch;
