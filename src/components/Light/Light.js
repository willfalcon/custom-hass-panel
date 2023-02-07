import React, { useEffect, useState } from 'react';
import { MdLightbulb, MdLightbulbOutline } from 'react-icons/md';
import styled from 'styled-components';
import { rgba } from 'polished';
import { animated, useTransition } from '@react-spring/web';
import debounce from 'lodash.debounce';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import { TfiAngleDown } from 'react-icons/tfi';

import Card from '../Card';
import { useHass } from '../../context';
import Brightness from './Brightness';
import Color from './Color';

export default function Light({ entity, style, area }) {
  const { state, attributes, callService } = useHass(entity);

  const iconTransition = useTransition(state == 'on', {
    from: {
      opacity: 0,
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const [red, blue, green] = attributes.rgb_color || [0, 0, 0];
  const color = `rgb(${red},${blue},${green})`;
  const [brightness, setBrightness] = useState(attributes.brightness ? Math.round((attributes.brightness / 255) * 100) : null);

  const adjustLight = debounce(brightness => {
    if (brightness) {
      callService('light', 'turn_on', {
        entity_id: entity,
        brightness: Math.round((brightness * 255) / 100),
      });
    }
  }, 1000);

  useEffect(() => {
    adjustLight(brightness);
  }, [brightness]);

  useEffect(() => {
    if (state == 'on') {
      setBrightness(Math.round((attributes.brightness / 255) * 100));
    }
  }, [state]);

  const [expanded, setExpanded] = useState(false);

  return (
    <LightCard styles={{ ...style, gridArea: area }} state={state} color={color} expanded={expanded}>
      <ButtonBase
        onClick={() => {
          callService('light', 'toggle', {
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
      <IconButton className="expand-button" onClick={() => setExpanded(!expanded)}>
        <TfiAngleDown />
      </IconButton>

      <Brightness entity={entity} color={color} brightness={brightness} setBrightness={setBrightness} />

      <div className="color-container">
        <Color entity={entity} color={color} />
      </div>
    </LightCard>
  );
}

export const LightCard = styled(Card)`
  grid-template-rows: auto auto auto;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'icon label expand'
    'icon state expand'
    'brightness brightness brightness';
  background-color: ${({ color, state }) => (state == 'on' ? rgba(color, 0.5) : 'var(--card-background)')};
  .expand-button {
    grid-area: expand;
  }
  .color-container {
    height: ${({ expanded }) => (expanded ? '50px' : '0px')};
    transition: 0.15s;
    overflow: hidden;
    grid-column: span 3;
    padding-top: 10px;
  }
  button {
    display: block;
    background: 0;
    border: 0;
    grid-area: icon;
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
`;

export const Icon = styled(animated.div)`
  width: 42px;
  height: 42px;
  background: rgba(27, 28, 25, 0.04);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  svg {
    width: 24px;
    height: 24px;
    opacity: 0.65;
  }
`;
