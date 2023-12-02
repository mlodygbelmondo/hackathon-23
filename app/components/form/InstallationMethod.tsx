import React from "react";

interface IInstalationMethodProps {
  nextStep: () => void;
  handleInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  previousStep: () => void;
  valueInput: string;
}

const InstalationMethod = ({
  nextStep,
  handleInput,
  previousStep,
  valueInput,
}: IInstalationMethodProps) => {
  const [value, setValue] = React.useState(valueInput);
  return (
    <div className="flex flex-col">
      <label
        htmlFor="installation-method"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Sposób instalacji...
      </label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleInput(e);
          setValue(e.target.value);
        }}
        id="installation-method"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="" selected={valueInput === ""}>
          Sposób instalacji...
        </option>
        <option value="a1" selected={valueInput === "a1"}>
          A1 - bezposrednio w scianie izolowanej cieplnie
        </option>
        <option value="a2" selected={valueInput === "a2"}>
          A2 - w rurze instalacyjnej w ścianie izolowanej cieplnie
        </option>
        <option value="b1" selected={valueInput === "b1"}>
          B1 - w rurze instalacyjnej na ścianie/murze - dla kabli jednożyłowych
        </option>
        <option value="b2" selected={valueInput === "b2"}>
          B2 - w rurze instalacyjnej na ścianie/murze - dla kabli i przewodów
          wielożyłowych
        </option>
        <option value="e" selected={valueInput === "e"}>
          E - w powietrzu (np. perforowane korytko) - dla kabli i przewodów
          wielożyłowych
        </option>
        <option value="f" selected={valueInput === "f"}>
          F - w powietrzu (np. perforowane korytko) - dla kabli jednożyłowych
        </option>
        <option selected={valueInput === "d1"} value="d1">
          D1 - w rurze osłonowej w ziemi
        </option>
        <option selected={valueInput === "d2"} value="d2">
          D2 - bezpośrednio w ziemi
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

export default InstalationMethod;
