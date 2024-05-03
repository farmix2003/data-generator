import React from "react";

const RandomButton = ({ handleRandomGeneration }) => {
  return (
    <button
      className="flex justify-center items-center bg-slate-700 text-white font-semibold rounded p-1"
      onClick={handleRandomGeneration}
    >
      Generate Random Data
    </button>
  );
};

export default RandomButton;
