import React from 'react';

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

const Slider: React.FC<Props> = ({ min, max, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange(value);
  };

  return (
    <div>
      <label htmlFor="frequency-slider">Update Frequency:</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <span>Current Frequency: {value}ms</span>
    </div>
  );
};

export default Slider;
