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
  const [value, setValue] = React.useState("");
  return (
    <div className="flex flex-col">
      <label
        htmlFor="countries"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Temperatura otoczenia
      </label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          handleInput(e);
          setValue(e.target.value);
        }}
        id="countries"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="" selected={valueInput === ""}>
          Temperatura otoczenia...
        </option>
        <option selected={valueInput === "10-15"} value="10-15">
          10-15
        </option>
        <option selected={valueInput === "16-20"} value="16-20">
          16-20
        </option>
        <option selected={valueInput === "21-25"} value="21-25">
          21-25
        </option>
        <option selected={valueInput === "26-30"} value="26-30">
          26-30
        </option>
        <option selected={valueInput === "31-35"} value="31-35">
          31-35
        </option>
        <option selected={valueInput === "36-40"} value="36-40">
          36-40
        </option>
        <option selected={valueInput === "41-45"} value="41-45">
          41-45
        </option>
        <option selected={valueInput === "46-50"} value="46-50">
          46-50
        </option>
        <option selected={valueInput === "51-55"} value="51-55">
          51-55
        </option>
        <option selected={valueInput === "56-60"} value="56-60">
          56-60
        </option>
        <option selected={valueInput === "61-65"} value="61-65">
          61-65
        </option>
        <option selected={valueInput === "66-70"} value="66-70">
          66-70
        </option>
        <option selected={valueInput === "71-75"} value="71-75">
          71-75
        </option>
        <option selected={valueInput === "76-80"} value="76-80">
          76-80
        </option>
        <option selected={valueInput === "81-85"} value="81-85">
          81-85
        </option>
        <option selected={valueInput === "86-90"} value="86-90">
          86-90
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

export default AmbientTemperature;
