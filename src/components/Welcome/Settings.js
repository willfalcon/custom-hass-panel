import React from 'react';
import { MdOutlineSettings } from 'react-icons/md';
import styled from 'styled-components';

import { buttonStyles } from '../Button';

export default function Settings({ url }) {
  return (
    <StyledButton href={`/${url}`}>
      <MdOutlineSettings />
    </StyledButton>
  );
}

const StyledButton = styled.a`
  ${buttonStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  right: 5px;
  height: 36px;
  width: 36px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
