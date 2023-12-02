const cables: CableType[] = ["YDY", "YDYp", "YKY", "YKXS", "N2XH", "YAKXS"];

interface CableEnvironment {
  name: CableType;
  availableEnvironments: Environment[];
  availableInstallationTypesForMultiConductorLoad: InstallationType[];
  availableInstallationTypesForOneConductorLoad: InstallationType[];
  availableConductorLoads: ConductorLoad[];
  isolationMaterial: IsolationType;
  maxTemperature: number;
  material?: "copper" | "aluminium";
}

const cablesEnvironments: CableEnvironment[] = [
  {
    name: "YDY",
    availableEnvironments: ["air"],
    availableInstallationTypesForMultiConductorLoad: ["A1", "A2", "B2", "E"],
    availableInstallationTypesForOneConductorLoad: [],
    availableConductorLoads: ["multi"],
    isolationMaterial: "PVC",
    maxTemperature: 70,
    material: "copper",
  },
  {
    name: "YDYp",
    availableEnvironments: ["air"],
    availableInstallationTypesForMultiConductorLoad: ["A1", "A2", "B2", "E"],
    availableInstallationTypesForOneConductorLoad: [],
    availableConductorLoads: ["multi"],
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
    availableConductorLoads: ["one", "two", "multi"],
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
    availableConductorLoads: ["one", "two", "multi"],
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
    availableConductorLoads: ["one", "two", "multi"],
    isolationMaterial: "XLPE",
    maxTemperature: 90,
    material: "aluminium",
  },
  {
    name: "N2XH",
    availableEnvironments: ["air"],
    availableInstallationTypesForMultiConductorLoad: ["A1", "A2", "B2", "E"],
    availableInstallationTypesForOneConductorLoad: ["A1", "B1", "F"],
    availableConductorLoads: ["one", "two", "multi"],
    isolationMaterial: "B2ca",
    maxTemperature: 90,
    material: "copper",
  },
];

import {
  air_temperature_coefficients,
  ground_temperature_coefficients,
  number_of_circuts_cooficients,
  thermal_resistance,
} from "./data.ts";
import { values } from "./tables";
import {
  CableType,
  ConductorLoad,
  Environment,
  InstallationType,
  IsolationType,
  NumberOfPhases,
} from "./types";

interface PowerParameters {
  numberOfPhases: NumberOfPhases;
  power?: number;
  loadCurrent?: number;
  powerCooficient?: number; // cos phi
}

const getCable = (
  materialType: "copper" | "aluminium",
  isolationMaterial: IsolationType,
  mountLocalisation: Environment,
  environmentTemperature: number,
  installationType: InstallationType,
  conductorLoad: ConductorLoad,
  numberOfWires: number,
  thermalResistance: number,
  powerParameters: PowerParameters,
) => {
  let availableCables: CableType[] = [];
  const isOneConductorLoad = conductorLoad === "one";

  availableCables = cables.filter((cableName) => {
    const cableEnvironment = cablesEnvironments.find(
      (cable) => cable.name === cableName,
    );

    return cableEnvironment?.material === materialType &&
      cableEnvironment?.availableEnvironments.includes(mountLocalisation) &&
      isOneConductorLoad
      ? cableEnvironment?.availableInstallationTypesForOneConductorLoad.includes(
          installationType,
        )
      : cableEnvironment?.availableInstallationTypesForMultiConductorLoad.includes(
          installationType,
        ) &&
          cableEnvironment?.availableConductorLoads.includes(conductorLoad) &&
          isolationMaterial === cableEnvironment?.isolationMaterial &&
          environmentTemperature <= cableEnvironment?.maxTemperature;
  });

  availableCables.forEach((cableName) => {
    const temperatureCooficientsForTemperature =
      mountLocalisation === "air"
        ? air_temperature_coefficients.find(
            (temperatureCooficient) =>
              temperatureCooficient.temperature_C === environmentTemperature,
          )
        : ground_temperature_coefficients.find(
            (temperatureCooficient) =>
              temperatureCooficient.temperature_C === environmentTemperature,
          );

    const temperatureCooficient =
      temperatureCooficientsForTemperature?.[cableName] ?? 1;

    const numberOfCircutsCooficientByNumberOfCircuts =
      number_of_circuts_cooficients.find(
        (cooficient) => cooficient.circuits === numberOfWires,
      );

    const numberOfCircutsCooficient =
      (conductorLoad === "one"
        ? numberOfCircutsCooficientByNumberOfCircuts?.one
        : numberOfCircutsCooficientByNumberOfCircuts?.multi) ?? 1;

    const thermalResistancances = thermal_resistance.find(
      (cooficient) =>
        cooficient.cable_type === cableName &&
        cooficient.ground_thermal_resistance === thermalResistance,
    );

    const thermalResistancanceCooficient =
      thermalResistancances?.[installationType] ?? 1;

    const phase1loadCurrent =
      (powerParameters.power ?? 1) /
      ((powerParameters.powerCooficient ?? 1) * 230);

    const phase3loadCurrent =
      (powerParameters.power ?? 1) /
      (Math.sqrt(3) * (powerParameters.powerCooficient ?? 1) * 400);

    const loadCurrent =
      powerParameters.loadCurrent ?? powerParameters.numberOfPhases === 1
        ? phase1loadCurrent
        : phase3loadCurrent;

    const load =
      loadCurrent /
      (temperatureCooficient *
        numberOfCircutsCooficient *
        thermalResistancanceCooficient *
        0.85);

    const cableValues = values.find((value) => value.cableName === cableName);
    const veinMode = cableValues?.[isOneConductorLoad ? "one" : "multi"];

    console.log(load);

    const numbersByInstallationType = veinMode?.find(
      (number) =>
        number.installationType === installationType &&
        number.numberOfPhases === powerParameters.numberOfPhases,
    );

    const crossSectionOfVein = numbersByInstallationType?.numbers.find(
      (number, index, arr) => {
        const nextNumber = arr[index + 1]?.loadCurrent ?? Infinity;
        if (nextNumber > load) {
          return number.loadCurrent;
        }
      },
    )?.crossSectionOfVein;

    console.log(
      `Cable name: ${cableName}, cross section of vein: ${crossSectionOfVein}`,
    );
  });

  return availableCables;
};

const res = getCable("copper", "PVC", "air", 60, "B1", "one", 6, 1.5, {
  numberOfPhases: 3,
  power: 6734,
  powerCooficient: 0.8,
});
