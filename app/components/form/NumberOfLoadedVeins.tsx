import React from "react";

interface INumberOfLoadedVeins {
  nextStep: () => void;
  handleInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  previousStep: () => void;
  valueInput: string;
}

const NumberOfLoadedVeins = ({
  nextStep,
  handleInput,
  previousStep,
  valueInput,
}: INumberOfLoadedVeins) => {
  const [value, setValue] = React.useState(valueInput);
  return (
    <div className="flex flex-col">
      <label
        htmlFor="number-of-loaded-veins"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Wybierz liczbe obciążonych żyl
      </label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleInput(e);
          setValue(e.target.value);
        }}
        id="number-of-loaded-veins"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="" selected={valueInput === ""}>
          Wybierz liczbę obciążonych żyl...
        </option>
        <option selected={valueInput === "two"} value="two">
          2
        </option>
        <option selected={valueInput === "multi-core"} value="multi-core">
          3 wielożyłowy
        </option>
        <option selected={valueInput === "single-core"} value="single-core">
          3 jednożyłowy
        </option>
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
          type="button"
          style={{
            marginLeft: "auto",
            width: "25%",
            marginTop: ".7rem",
          }}
          className="rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={nextStep}
        >
          Dalej
        </button>
      </div>
    </div>
  );
};

export default NumberOfLoadedVeins;
