import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

export const buttonStyles = css`
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--text-color);
`;

export default function Button({ children, className }) {
  return <StyledButton className={classNames('button', className)}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  ${buttonStyles}
`;
