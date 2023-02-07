import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';

import { useHass } from '../../context';

import 'react-tooltip/dist/react-tooltip.css';

const Battery = ({ entity }) => {
  const {
    state,
    attributes: { battery_level, friendly_name },
  } = useHass(entity);

  const color = battery_level > 50 ? 'green' : battery_level > 20 ? '#F7C619' : 'red';
  return (
    <>
      <ProgressWrapper level={battery_level} color={color} id={`${entity}-level`} data-tooltip-content={friendly_name}>
        <span className="level">
          {battery_level}
          <sup>%</sup>
        </span>
        <div className="pie">
          <div className="left-side half-circle"></div>
          <div className="right-side half-circle"></div>
        </div>
      </ProgressWrapper>
      <Tooltip anchorId={`${entity}-level`} />
    </>
  );
};

const ProgressWrapper = styled.div`
  --size: 25px;
  position: absolute;
  width: var(--size);
  height: var(--size);
  top: 5px;
  right: 5px;
  .pie {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0, var(--size), var(--size), calc(var(--size) / 2));
  }
  .half-circle {
    width: 100%;
    height: 100%;
    border: 3px solid ${({ color }) => color};
    border-radius: 50%;
    clip: rect(0, calc(var(--size) / 2), var(--size), 0);
    left: 0;
    top: 0;
    position: absolute;
  }
  .left-side {
    transform: rotate(${({ level }) => level * 3.6}deg);
  }
  ${({ level }) =>
    level <= 50
      ? `
  .right-side {
    display: none;
  }
  `
      : `
  .pie {
    clip: rect(auto, auto, auto, auto);
  }
  .right-side {
    transform: rotate(180deg);
  }
  `}
  .level {
    border-radius: 50%;
    font-size: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 8px;
  }
`;

export default Battery;
