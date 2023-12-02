import { useState } from "react";
import Input from "~/components/input";
import Select, { type Option } from "~/components/select";
import type {
  CableEnvironment,
  CableType,
  ConductorLoad,
  Environment,
  InstallationType,
} from "~/types";

export interface InitialDataProps {
  typeOfMetal: string;
  installationLocation: string;
  isolationMaterial: string;
  numberOfLoadedVeins: string;
  installationMethod: string;
  ambientTemperature: string;
  thermalResistivityOfTheSoil: string;
  power?: string;
  load?: string;
  powerFactor?: string;
  amountOfCables: string;
}

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

const initialData = {
  typeOfMetal: "",
  installationLocation: "",
  isolationMaterial: "",
  numberOfLoadedVeins: "",
  installationMethod: "",
  ambientTemperature: "",
  thermalResistivityOfTheSoil: "",
  power: 0,
  load: 0,
  powerFactor: 0,
  amountOfCables: "0",
};

const metalTypes = [
  {
    label: "Miedz",
    value: "copper",
  },
  {
    label: "Aluminium",
    value: "aluminium",
  },
];

const instalationLocations = [
  {
    label: "W ziemi",
    value: "ground",
  },
  {
    label: "W powietrzu",
    value: "air",
  },
];

const numberOfLoadedVeins = [
  {
    label: "układ jednofazowy (dwie żyły obciążone)",
    value: "two",
  },
  {
    label: "układ trójfazowy (wielozylowy)",
    value: "multi",
  },
  {
    label: "układ trójfazowy jednożyłowy",
    value: "one",
  },
];

const isolationMaterials = [
  {
    label: "PVC",
    value: "PVC",
  },
  {
    label: "XLPE",
    value: "XLPE",
  },
  {
    label: "B2ca",
    value: "B2ca",
  },
];

const cables: CableType[] = ["YDY", "YDYp", "YKY", "YKXS", "N2XH", "YAKXS"];

const cablesEnvironments: CableEnvironment[] = [
  {
    name: "YDY",
    availableEnvironments: ["air"],
    availableInstallationTypesForMultiConductorLoad: ["A1", "A2", "B2", "E"],
    availableInstallationTypesForOneConductorLoad: [],
    availableNumberOfLoadedVeins: ["two", "multi"],
    isolationMaterial: "PVC",
    maxTemperature: 70,
    material: "copper",
  },
  {
    name: "YDYp",
    availableEnvironments: ["air"],
    availableInstallationTypesForMultiConductorLoad: ["A1", "A2", "B2", "E"],
    availableInstallationTypesForOneConductorLoad: [],
    availableNumberOfLoadedVeins: ["two", "multi"],
    isolationMaterial: "PVC",
    maxTemperature: 70,
    material: "copper",
  },
  {
    name: "YKY",
    availableEnvironments: ["air", "ground"],
    availableInstallationTypesForMultiConductorLoad: [
      "A1",
      "A2",
      "B1",
      "B2",
      "E",
      "D2",
      "D1",
      "F",
    ],
    availableInstallationTypesForOneConductorLoad: ["A1", "B1", "F", "D2"],
    availableNumberOfLoadedVeins: ["one", "two", "multi"],
    isolationMaterial: "PVC",
    maxTemperature: 70,
    material: "copper",
  },
  {
    name: "YKXS",
    availableEnvironments: ["air", "ground"],
    availableInstallationTypesForMultiConductorLoad: [
      "A1",
      "A2",
      "B2",
      "E",
      "D1",
      "D2",
    ],
    availableInstallationTypesForOneConductorLoad: [
      "A1",
      "B1",
      "F",
      "D2",
      "D1",
    ],
    availableNumberOfLoadedVeins: ["one", "two", "multi"],
    isolationMaterial: "XLPE",
    maxTemperature: 90,
    material: "copper",
  },
  {
    name: "YAKXS",
    availableEnvironments: ["air", "ground"],
    availableInstallationTypesForMultiConductorLoad: [
      "A1",
      "A2",
      "B2",
      "E",
      "D1",
      "D2",
    ],
    availableInstallationTypesForOneConductorLoad: [
      "A1",
      "B1",
      "F",
      "D2",
      "D1",
    ],
    availableNumberOfLoadedVeins: ["one", "two", "multi"],
    isolationMaterial: "XLPE",
    maxTemperature: 90,
    material: "aluminium",
  },
  {
    name: "N2XH",
    availableEnvironments: ["air"],
    availableInstallationTypesForMultiConductorLoad: ["A1", "A2", "B2", "E"],
    availableInstallationTypesForOneConductorLoad: ["A1", "B1", "F"],
    availableNumberOfLoadedVeins: ["one", "two", "multi"],
    isolationMaterial: "B2ca",
    maxTemperature: 90,
    material: "copper",
  },
];

const FormPage = () => {
  const [formData, setFormData] = useState<InitialDataProps>(initialData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const getFilteredCables = () => {
    let availableCables: CableType[] = cables;

    if (formData.typeOfMetal) {
      availableCables = availableCables.filter(
        (cable) =>
          cablesEnvironments.find((env) => env.name === cable)?.material ===
          formData.typeOfMetal,
      );
    }

    if (formData.installationLocation) {
      availableCables = availableCables.filter(
        (cable) =>
          cablesEnvironments
            .find((env) => env.name === cable)
            ?.availableEnvironments.includes(
              formData.installationLocation as Environment,
            ) ?? false,
      );
    }

    if (formData.ambientTemperature) {
      availableCables = availableCables.filter((cable) => {
        const env = cablesEnvironments.find((env) => env.name === cable);
        console.log(env?.maxTemperature, parseInt(formData.ambientTemperature));
        return (
          (env?.maxTemperature ?? 0) >= parseInt(formData.ambientTemperature)
        );
      });
    }

    if (formData.isolationMaterial) {
      availableCables = availableCables.filter(
        (cable) =>
          cablesEnvironments.find((env) => env.name === cable)
            ?.isolationMaterial === formData.isolationMaterial,
      );
    }

    if (formData.numberOfLoadedVeins) {
      availableCables = availableCables.filter(
        (cable) =>
          cablesEnvironments
            .find((env) => env.name === cable)
            ?.availableNumberOfLoadedVeins.includes(
              formData.numberOfLoadedVeins as ConductorLoad,
            ) ?? false,
      );
    }

    if (formData.installationMethod) {
      const isOneConductorLoad = formData.numberOfLoadedVeins === "one";
      availableCables = availableCables.filter((cable) =>
        isOneConductorLoad
          ? cablesEnvironments
              .find((env) => env.name === cable)
              ?.availableInstallationTypesForOneConductorLoad.includes(
                formData.installationMethod as InstallationType,
              )
          : cablesEnvironments
              .find((env) => env.name === cable)
              ?.availableInstallationTypesForMultiConductorLoad.includes(
                formData.installationMethod as InstallationType,
              ),
      );
    }

    return availableCables;
  };

  const getAvailableIsolations = () => {
    const availableCables = getFilteredCables();

    const availableIsolations = availableCables
      .map((cable) => cablesEnvironments.find((env) => env.name === cable))
      .map((env) => env?.isolationMaterial)
      .filter((val, index, self) => self.indexOf(val) === index);

    return availableIsolations.map((iso) => ({
      label: iso,
      value: iso,
    })) as Option[];
  };

  const getAvailableNumberOfLoadedVeins = () => {
    const availableCables = getFilteredCables();

    const availableEnvironments = cablesEnvironments.filter((env) =>
      availableCables.includes(env.name as CableType),
    );

    const availableNumberOfLoadedVeins = [
      ...new Set(
        availableEnvironments
          .map((env) => env.availableNumberOfLoadedVeins)
          .flat(),
      ),
    ];

    return availableNumberOfLoadedVeins.map((num) => ({
      label: numberOfLoadedVeins.find((n) => n.value === num)?.label,
      value: num,
    })) as Option[];
  };

  const getAvailableInstallationTypes = () => {
    const isOneConductorLoad = formData.numberOfLoadedVeins === "one";
    const availableCables = getFilteredCables();
    const availableEnvironments = cablesEnvironments.filter((env) =>
      availableCables.includes(env.name as CableType),
    );

    const availableInstallationTypes = [
      ...new Set(
        availableEnvironments
          .map((env) =>
            isOneConductorLoad
              ? env.availableInstallationTypesForOneConductorLoad
              : env.availableInstallationTypesForMultiConductorLoad,
          )
          .flat(),
      ),
    ];

    return availableInstallationTypes.map((type) => ({
      label: type,
      value: type,
    })) as Option[];
  };

  const resistivityOptions: Option[] = [
    { label: "0.5", value: "0.5" },
    { label: "0.7", value: "0.7" },
    { label: "1", value: "1" },
    { label: "1.5", value: "1.5" },
    { label: "2", value: "2" },
    { label: "2.5", value: "2.5" },
    { label: "3", value: "3" },
  ];

  const amountOfCables: Option[] = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
  ];

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="pb-4 text-3xl">Formularz zgłoszeniowy</h1>
      <form onSubmit={handleSubmit} className="w-1/2">
        {/* {renderCurrentFormStep(step)} */}
        <Select
          label="Wybierz tworzywo"
          defaultOptionLabel="Wybierz tworzywo..."
          onChange={(val) =>
            setFormData({
              ...formData,
              typeOfMetal: val,
              installationLocation: "",
              isolationMaterial: "",
              numberOfLoadedVeins: "",
              installationMethod: "",
              ambientTemperature: "",
            })
          }
          options={metalTypes}
          selectedValue={formData.typeOfMetal}
        />
        <Select
          label="Wybierz lokalizacja montowania"
          defaultOptionLabel="Wybierz lokalizacja montowania..."
          onChange={(val) =>
            setFormData({
              ...formData,
              installationLocation: val,
              isolationMaterial: "",
              numberOfLoadedVeins: "",
              installationMethod: "",
              ambientTemperature: "",
            })
          }
          options={instalationLocations}
          selectedValue={formData.installationLocation}
        />
        <Select
          label="Wybierz temperature otoczenia"
          defaultOptionLabel="Wybierz temperature otoczenia..."
          onChange={(val) =>
            setFormData({
              ...formData,
              ambientTemperature: val,
              isolationMaterial: "",
              numberOfLoadedVeins: "",
              installationMethod: "",
            })
          }
          options={temperatures.map((temp) => ({
            label: temp + " C",
            value: temp,
          }))}
          selectedValue={formData.ambientTemperature}
        />
        <Select
          label="Wybierz materiał izolacyjny"
          defaultOptionLabel="Wybierz materiał izolacyjny..."
          onChange={(val) =>
            setFormData({
              ...formData,
              isolationMaterial: val,
              numberOfLoadedVeins: "",
              installationMethod: "",
            })
          }
          options={getAvailableIsolations()}
          selectedValue={formData.isolationMaterial}
        />
        <Select
          label="Wybierz liczbe zyl obciazonych"
          defaultOptionLabel="Wybierz liczbe zyl obciazonych..."
          onChange={(val) =>
            setFormData({
              ...formData,
              numberOfLoadedVeins: val,
              installationMethod: "",
            })
          }
          options={getAvailableNumberOfLoadedVeins()}
          selectedValue={formData.numberOfLoadedVeins}
        />
        <Select
          label="Wybierz metode montowania"
          defaultOptionLabel="Wybierz metode montowania..."
          onChange={(val) =>
            setFormData({
              ...formData,
              installationMethod: val,
            })
          }
          options={getAvailableInstallationTypes()}
          selectedValue={formData.installationMethod}
        />
        <p className="pt-4">
          UWAGA: Jezeli wpisałeś obciążenie to moc i współzynnik mocy zostają
          zignorowane przy obliczeniach
        </p>
        <Input
          placeholderValue="Wpisz moc"
          onChange={(val) =>
            setFormData({
              ...formData,
              power: val,
            })
          }
          label="Wpisz moc"
        />
        <Input
          placeholderValue="Wpisz obciazenie"
          onChange={(val) =>
            setFormData({
              ...formData,
              load: val,
            })
          }
          label="Wpisz obciazenie"
        />
        <Input
          placeholderValue="Wpisz wspolczynnik mocy"
          onChange={(val) =>
            setFormData({
              ...formData,
              powerFactor: val,
            })
          }
          label="Wpisz wspolczynnik mocy"
        />
        <Select
          label="Wybierz rezystywność cieplną gruntu "
          defaultOptionLabel="Wybierz rezystywność cieplną gruntu "
          onChange={(val) =>
            setFormData({
              ...formData,
              thermalResistivityOfTheSoil: val,
            })
          }
          options={resistivityOptions}
          selectedValue={formData.thermalResistivityOfTheSoil}
        />
        <Select
          label="Wybierz ilość przewodów "
          defaultOptionLabel="Wybierz ilość przewodów... "
          onChange={(val) =>
            setFormData({
              ...formData,
              amountOfCables: val,
            })
          }
          options={amountOfCables}
          selectedValue={formData.amountOfCables}
        />
        <button
          className="mt-4 w-1/3 rounded-xl  bg-blue-500 px-6 py-2  hover:bg-blue-700"
          type="submit"
        >
          Wyslij
        </button>
      </form>
      {getFilteredCables().join(", ")}
    </div>
  );
};

export default FormPage;
