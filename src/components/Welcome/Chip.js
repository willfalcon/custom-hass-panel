import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import ButtonBase from '@mui/material/ButtonBase';

const Chip = ({ label, color, Icon, onClick }) => {
  return (
    <StyledChip color={color} onClick={onClick}>
      <span className="icon">
        <Icon color={color} />
      </span>
      <span className="label">{label}</span>
    </StyledChip>
  );
};

const StyledChip = styled(ButtonBase)`
  .card & {
    flex-direction: column;
    width: 52px;
    height: 84px;
    border-radius: 26px;

    box-shadow: var(--box-shadow);
    justify-content: space-between;
    padding: 9px 9px 12px;
    margin: 0 10px;
  }

  .icon {
    background: ${({ color }) => rgba(color, 0.2)};
    padding: 8px;
    border-radius: 50%;
    svg {
      width: 25px;
      height: 25px;
    }
  }
  span {
    margin: 0;
  }
  .label {
    font-size: 10px;
  }
`;

export default Chip;
