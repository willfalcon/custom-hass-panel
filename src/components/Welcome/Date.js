import React from 'react';
import Card from '../Card';

export default function DateWeather() {
  const now = new Date();
  return (
    <Card className="date">
      <span className="date__date">
        {now.toLocaleString('default', { month: 'short' })} {now.getDate()}
      </span>
    </Card>
  );
}
