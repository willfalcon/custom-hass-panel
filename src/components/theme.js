import { css } from 'styled-components';

const theme = {
  heat: '#FF6232',
  cool: '#3B76E5',
  green: '#51AF46',
  blue: 'rgb(61, 90, 254)',
  yellow: 'rgb(255, 145, 1)',
  purple: 'rgb(102, 31, 255)',
  red: 'rgb(245, 68, 54)',
  error: '#F54436',
  warning: '#FF9101',
  success: '#01C852',
  font: {
    family: 'Roboto, sans-serif',
    regular: '400',
    medium: '500',
    bold: '700',
    black: '900',
  },
  sizes: {
    break: 768,
    large: 1024,
    content: 900,
    wide: 1200,
    header: 150,
  },
};

const media = Object.keys(theme.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export { media };
export default theme;
