import React from 'react';
import styled from 'styled-components';
import { animated } from '@react-spring/web';

import Light from './Light/Light.js';
import Switch from './Switch';
import Label from './Label';

const Lights = ({ styles }) => {
  return (
    <Layout style={styles}>
      <Label title={+true}>Lights</Label>
      <Label>Bedroom</Label>
      <Light entity="light.wills_lamp" />
      <Light entity="light.annas_lamp" />
      <Label>Living Room</Label>
      <Switch entity="switch.living_room_lamp" />
      <Light entity="light.tv_stand_lamp" />
      <Label>Office</Label>
      <Light entity="light.office_desk_lamp" />
      <Light entity="light.office_piano_lamp" />
      <Label>Kitchen</Label>
      <Light entity="light.kitchen_light" />
      <Light entity="light.kitchen_lamp" />
      <Switch entity="light.kitchen_switch" />
    </Layout>
  );
};

export const Layout = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  position: absolute;
  width: 100%;
`;

export default Lights;
