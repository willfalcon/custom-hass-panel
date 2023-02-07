import React from 'react';
import styled from 'styled-components';
import { IoFlameOutline, IoSnow } from 'react-icons/io5';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TbLeaf } from 'react-icons/tb';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import theme from '../theme';
import { useThermostat } from './Thermostat';

const ModeSetting = ({ action = 'cool' }) => {
  const { mode, callService, entity } = useThermostat();

  const color = mode == 'heat' ? theme.heat : mode == 'cool' ? theme.cool : '';

  return (
    <ModeBox color={color} mode={mode} action={action} variant="outlined" style={{ display: 'flex' }}>
      <IconButton
        className="heat"
        onClick={() => {
          callService('climate', 'set_hvac_mode', {
            entity_id: entity,
            hvac_mode: 'heat',
          });
        }}
      >
        <IoFlameOutline />
      </IconButton>
      <IconButton
        className="cool"
        onClick={() => {
          callService('climate', 'set_hvac_mode', {
            entity_id: entity,
            hvac_mode: 'cool',
          });
        }}
      >
        <IoSnow />
      </IconButton>
      <IconButton
        className="heat-cool"
        onClick={() => {
          callService('climate', 'set_hvac_mode', {
            entity_id: entity,
            hvac_mode: 'heat_cool',
          });
        }}
      >
        <HiOutlineRefresh />
      </IconButton>
      <IconButton
        className="eco"
        onClick={() => {
          callService('climate', 'set_preset_mode', {
            entity_id: entity,
            preset_mode: 'eco',
          });
        }}
      >
        <TbLeaf />
      </IconButton>
    </ModeBox>
  );
};

const ModeBox = styled(ButtonGroup)`
  border: 1px solid var(--text-color-secondary);
  /* border-radius: var(--border-radius); */
  padding: 10px;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  button {
    background: none;
    border: 0;
    cursor: pointer;
    ${({ mode, theme, action }) => {
      switch (mode) {
        case 'heat':
          return ` &.heat {
            color: ${theme.heat};
          }`;
        case 'cool':
          return ` &.cool {
            color: ${theme.cool};
          }`;
        case 'heat_cool':
          return action == 'heat'
            ? ` &.heat-cool {
            color: ${theme.heat};
          }`
            : action == 'cool'
            ? `&.heat-cool {
            color: ${theme.cool};
          }`
            : '';
        case 'eco':
          return `&.eco {
            color: ${theme.green}
          }`;
      }
    }}
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default ModeSetting;
