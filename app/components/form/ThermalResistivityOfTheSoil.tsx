import React from "react";

interface IThermalResistivityOfTheSoilProps {
  handleInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  previousStep: () => void;
}

const ThermalResistivityOfTheSoil = ({
  handleInput,
  previousStep,
}: IThermalResistivityOfTheSoilProps) => {
  const [value, setValue] = React.useState("");
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
      >
        <option value="" selected>
          Rezystywność cieplna gruntu...
        </option>
        <option value="0.5">0.5</option>
        <option value="0.7">0.7</option>
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
        <option value="2.5">2.5</option>
        <option value="3">3</option>
      </select>

      <div className="w-100 flex">
        <button
          type="button"
          style={{
            marginRight: "auto",
            width: "25%",
            marginTop: ".7rem",
          }}
          className="rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={previousStep}
        >
          Cofnij
        </button>
        <button
          disabled={value === ""}
          type="submit"
          style={{
            marginLeft: "auto",
            width: "25%",
            marginTop: ".7rem",
          }}
          className="rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
};

export default ThermalResistivityOfTheSoil;
