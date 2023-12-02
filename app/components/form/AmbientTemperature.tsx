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
  const temperatures = [
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
    "60",
    "65",
    "70",
    "75",
    "80",
  ];

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
        {temperatures.map((temperature) => (
          <option
            key={temperature}
            value={temperature}
            selected={valueInput === temperature}
          >
            {temperature}
          </option>
        ))}
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
