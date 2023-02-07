export function toRadians(angle) {
  return (angle * Math.PI) / 180;
}

export function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function getCoords(angle) {
  if (!angle) {
    return null;
  }
  const r = 147.5;
  return [round(r * Math.cos(toRadians(angle + 90))), round(r * Math.sin(toRadians(angle + 90)))];
}

export function getAngle(temp, min, max) {
  if (!temp) {
    return null;
  }
  const dT = max - min;
  return 2.7 * ((100 * (temp - min)) / dT) + 45;
}
