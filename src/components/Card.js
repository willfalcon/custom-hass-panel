import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import { media } from './theme';

export default function Card({ className, children, style }) {
  return (
    <StyledCard className={classNames('card', className)} style={style}>
      {children}
    </StyledCard>
  );
}

const StyledCard = styled.div`
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 10px 16px;
  margin-bottom: 8px;
  color: var(--text-color);

  display: grid;
  grid-template-columns: 42px 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'icon label'
    'icon state';
  column-gap: 10px;
  position: relative;
  ${media.break`
    padding: 10px 26px;
  `}
  .label {
    grid-area: label;
    font-weight: 700;
  }
  .state {
    grid-area: state;
    font-size: 12px;
    color: var(--text-color-secondary);
    font-weight: 600;
  }

  .heading {
    font-weight: 700;
    font-size: 24px;
  }
`;
