import React from "react";

const RegionSelection = ({ regions, selectedRegion, handleRegionChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="region-select" className="font-semibold text-[20px] mr-1">
        Select Region:
      </label>
      <select
        id="region-select"
        value={selectedRegion}
        onChange={handleRegionChange}
        className="border-2 border-black w-[150px] rounded ml-1"
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelection;
