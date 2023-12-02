import React from "react";

interface IAmbientTemperatureProps {
  nextStep: () => void;
  handleInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  previousStep: () => void;
  valueInput: string;
}

const AmbientTemperature = ({
  nextStep,
  handleInput,
  previousStep,
  valueInput,
}: IAmbientTemperatureProps) => {
  const [value, setValue] = React.useState(valueInput);
  return (
    <div className="flex flex-col">
      <label
        htmlFor="ambient-temperature"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Temperatura otoczenia
      </label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleInput(e);
          setValue(e.target.value);
        }}
        id="ambient-temperature"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="" selected={valueInput === ""}>
          Temperatura otoczenia...
        </option>
        <option selected={valueInput === "10"} value="10">
          10
        </option>
        <option selected={valueInput === "15"} value="15">
          15
        </option>
        <option selected={valueInput === "20"} value="20">
          20
        </option>
        <option selected={valueInput === "25"} value="25">
          25
        </option>
        <option selected={valueInput === "30"} value="30">
          30
        </option>
        <option selected={valueInput === "35"} value="35">
          35
        </option>
        <option selected={valueInput === "40"} value="40">
          40
        </option>
        <option selected={valueInput === "45"} value="45">
          45
        </option>
        <option selected={valueInput === "50"} value="50">
          50
        </option>
        <option selected={valueInput === "55"} value="55">
          55
        </option>
        <option selected={valueInput === "60"} value="60">
          60
        </option>
        <option selected={valueInput === "65"} value="65">
          65
        </option>
        <option selected={valueInput === "70"} value="70">
          70
        </option>
        <option selected={valueInput === "75"} value="75">
          75
        </option>
        <option selected={valueInput === "80"} value="80">
          80
        </option>
      </select>
      <div className="w-100 flex">
        <button
          type="button"
          className="mr-auto mt-4 w-1/4 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={previousStep}
        >
          Cofnij
        </button>
        <button
          disabled={value === ""}
          type="button"
          className="ml-auto mt-4 w-1/4 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={nextStep}
        >
          Dalej
        </button>
      </div>
    </div>
  );
};

export default AmbientTemperature;
