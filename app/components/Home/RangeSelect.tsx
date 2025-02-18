import React, { useState } from "react";

interface RangeSelectProps {
  onRadiusChange: (radius: number) => void;
}

const RangeSelect: React.FC<RangeSelectProps> = ({ onRadiusChange }) => {
  const [radius, setRadius] = useState<number>(10);

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value, 10);
    setRadius(newRadius);
    onRadiusChange(newRadius);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold p-2">Select Radius (In Meter)</h2>
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min={0}
        max={100}
        step={10}
        value={radius}
        onChange={handleRadiusChange}
      />
      <label className="text-gray-500 text-[15px]">{radius * 100} in Meter</label>
    </div>
  );
};

export default RangeSelect;
