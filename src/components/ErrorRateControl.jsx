/* eslint-disable react/prop-types */

const ErrorRateControls = ({
  errorRate,
  handleSliderChange,
  handleInputChange,
}) => {
  return (
    <div className="flex items-center">
      <div>
        <label
          htmlFor="error-rate-slider"
          className="font-semibold text-[20px] mr-2"
        >
          Error Rate:
        </label>
        <input
          type="range"
          id="error-rate-slider"
          min="0"
          max="10"
          step="0.1"
          className="ml-1 mr-3 mt-1 w-[190px]"
          value={errorRate}
          onChange={handleSliderChange}
        />
        <input
          type="number"
          width={"10px"}
          min="0"
          max="1000"
          className="text-[20px] bg-transparent font-semibold"
          value={errorRate}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ErrorRateControls;
