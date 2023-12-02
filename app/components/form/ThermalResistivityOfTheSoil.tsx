import React, { useState } from "react";

interface IThermalResistivityOfTheSoilProps {
  handleInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  previousStep: () => void;
}

const ThermalResistivityOfTheSoil = ({
  handleInput,
  previousStep,
}: IThermalResistivityOfTheSoilProps) => {
  const [value, setValue] = useState("");
  const resistivityOptions = ["", "0.5", "0.7", "1", "1.5", "2", "2.5", "3"];

  return (
    <div className="flex flex-col">
      <label
        htmlFor="thermal-resistivity-of-the-soil"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Rezystywność cieplna gruntu
      </label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleInput(e);
          setValue(e.target.value);
        }}
        id="thermal-resistivity-of-the-soil"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        value={value}
      >
        {resistivityOptions.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue === ""
              ? "Rezystywność cieplna gruntu..."
              : optionValue}
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
          type="submit"
          className="ml-auto mt-4 w-1/4 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
};

export default ThermalResistivityOfTheSoil;
