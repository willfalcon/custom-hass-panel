import styled from 'styled-components';

const Label = styled.span`
  font-weight: 700;
  grid-area: ${({ area }) => area};
  grid-column: span 2;
  font-size: ${({ title }) => (title ? '24px' : '16px')};
  color: ${({ title }) => (title ? 'var(--text-color)' : 'var(--text-color-secondary)')};
  margin-bottom: 10px;
`;

export default Label;
