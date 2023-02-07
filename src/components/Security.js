import React from 'react';
import Door from './Door.js/Door';
import Label from './Label';
import { Layout } from './Lights';
import Lock from './Lock/Lock';

const Security = ({ styles }) => {
  return (
    <Layout style={styles}>
      <Label title={+true}>Security</Label>
      <Lock entity="lock.carport_door" />
      <Label>Doors</Label>
      <Door entity="sensor.carport_door" />
      <Door entity="sensor.back_door" />
      <Door entity="sensor.closet_door" />
      <Door entity="sensor.front_door" />
    </Layout>
  );
};

export default Security;
