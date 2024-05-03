import React from "react";

const SeedValueInput = ({ seedValue, handleSeedChange, handleRandomSeed }) => {
  return (
    <div className="flex justify-center items-center">
      <label htmlFor="seed-input" className="font-semibold text-[20px]">
        Seed Value:
      </label>
      <input
        type="number"
        id="seed-input"
        className="border-black border-b-2 mx-2"
        value={seedValue}
        onChange={handleSeedChange}
      />
      <button
        className=" bg-slate-700 text-white p-[3px] rounded font-semibold"
        onClick={handleRandomSeed}
      >
        Random Seed
      </button>
    </div>
  );
};

export default SeedValueInput;
