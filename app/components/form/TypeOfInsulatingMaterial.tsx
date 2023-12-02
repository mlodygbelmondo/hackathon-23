import React from "react";

interface ITypeOfInsulatingMaterialProps {
  nextStep: () => void;
  handleInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  previousStep: () => void;
  valueInput: string;
}

const TypeOfInsulatingMaterial = ({
  nextStep,
  handleInput,
  previousStep,
  valueInput,
}: ITypeOfInsulatingMaterialProps) => {
  const [value, setValue] = React.useState(valueInput);
  return (
    <div className="flex flex-col">
      <label
        htmlFor="type-of-insulating-material"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Rodzaj tworzywa izolacyjnego
      </label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleInput(e);
          setValue(e.target.value);
        }}
        id="type-of-insulating-material"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="" selected={valueInput === ""}>
          Rodzaj tworzywa izolacyjnego
        </option>
        <option selected={valueInput === "pvc"} value="pvc">
          PVC tj. polichlorek winylu
        </option>
        <option selected={valueInput === "xlpe"} value="xlpe">
          XLPE tj. polietylen sieciowany
        </option>
        <option selected={valueInput === "b2ca"} value="b2ca">
          tworzywo bezhalogenowe klasy B2ca
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

export default TypeOfInsulatingMaterial;
