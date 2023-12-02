import { useState } from "react";
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

    console.log(formData.numberOfLoadedVeins);
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
      </form>
      {getFilteredCables().join(", ")}
    </div>
  );
};

export default FormPage;
