import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { debounce } from '../../lib/utils';
import { useHass } from '../../context';
import useDebounce from '../../lib/useDebounce';
export default function Brightness({ entity, color }) {
  const { state, attributes, callService } = useHass(entity);
  const [liveBrightness, setBrightness] = useState(attributes.brightness ? Math.round((attributes.brightness / 255) * 100) : null);
  const debouncedBrightness = useDebounce(liveBrightness, 1000);

  const [mouseDown, setMouseDown] = useState(false);
  const handleMove = e => {
    if (mouseDown) {
      setBrightness(Math.round((e.nativeEvent.offsetX / e.target.clientWidth) * 100));
    }
  };

  useEffect(() => {
    async function asyncCallService() {
      try {
        await callService('light', 'turn_on', {
          entity_id: entity,
          brightness: Math.round((debouncedBrightness * 255) / 100),
        });
      } catch (err) {
        console.error('error caught in brightness effect', err);
      }
    }
    asyncCallService();
  }, [debouncedBrightness]);

  return (
    <Slider
      brightness={liveBrightness}
      color={color}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => {
        setMouseDown(false);
      }}
      onMouseMove={handleMove}
    />
  );
}

export const Slider = styled.div`
  grid-area: brightness;
  position: relative;
  height: 40px;
  width: 100%;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 10px;
  &::before {
    background: ${({ color }) => rgba(color, 0.25)};
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px;
    height: 100%;
    width: 100%;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px 0 0 15px;
    height: 100%;
    width: ${({ brightness }) => brightness}%;

    background: ${({ color }) => color};
  }
`;
