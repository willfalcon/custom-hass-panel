import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import kelvinToRgb from 'kelvin-to-rgb';

import { useHass } from '../../context';
import { debounce } from '../../lib/utils';
import useDebounce from '../../lib/useDebounce';
import { Slider } from './Brightness';

const formatRGB = arr => `rgb(${arr[0]},${arr[1]},${arr[2]})`;

const Color = ({ entity }) => {
  const { state, attributes, callService } = useHass(entity);
  const min = attributes.min_color_temp_kelvin;
  const minRGB = kelvinToRgb(min);
  const max = attributes.max_color_temp_kelvin;
  const maxRGB = kelvinToRgb(max);
  const current = attributes.color_temp_kelvin;
  const currentRGB = kelvinToRgb(current);
  const currentPerc = (100 * (current - min)) / (max - min);

  const [liveCurrent, setCurrent] = useState(current);
  const [livePerc, setPerc] = useState(currentPerc);

  const debouncedPerc = useDebounce(livePerc, 1000);

  const [mouseDown, setMouseDown] = useState(false);
  const handleMove = e => {
    if (mouseDown) {
      setPerc(Math.round((e.nativeEvent.offsetX / e.target.clientWidth) * 100));
    }
  };

  useEffect(() => {
    async function asyncCallService() {
      try {
        await callService('light', 'turn_on', {
          entity_id: entity,
          kelvin: Math.round((debouncedPerc * (max - min)) / 100 + min),
        });
      } catch (err) {
        console.error('error caught in color effect', err);
      }
    }
    asyncCallService();
  }, [debouncedPerc]);

  return (
    <ColorSlider
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => {
        setMouseDown(false);
      }}
      onMouseMove={handleMove}
      minColor={formatRGB(minRGB)}
      maxColor={formatRGB(maxRGB)}
      currentPerc={livePerc}
    />
  );
};

const ColorSlider = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  background: ${({ minColor, maxColor }) => `linear-gradient(to right, ${minColor}, ${maxColor})`};

  &::after {
    content: '';
    height: calc(100% - 8px);
    width: 5px;
    background: transparent;
    left: calc(${({ currentPerc }) => currentPerc}% - 5px);
    border-radius: 10px;
    border: 4px solid var(--text-color);
    position: absolute;
  }
`;

export default Color;
