import {
  air_temperature_coefficients,
  ground_temperature_coefficients,
  number_of_circuts_cooficients,
  thermal_resistance,
} from "./data";
import { values } from "./tables";
import {
  type CableMaterial,
  type CableType,
  type ConductorLoad,
  type Environment,
  type InstallationType,
  type IsolationType,
  type NumberOfPhases,
} from "./types";

interface PowerParameters {
  numberOfPhases: NumberOfPhases;
  power?: number;
  loadCurrent?: number;
  powerCooficient?: number; // cos phi
}

export const getCable = (
  materialType: CableMaterial,
  isolationMaterial: IsolationType,
  mountLocalisation: Environment,
  environmentTemperature: number,
  installationType: InstallationType,
  conductorLoad: ConductorLoad,
  numberOfWires: number,
  thermalResistance: number,
  powerParameters: PowerParameters,
  availableCables: CableType[],
  multiplier: string,
) => {
  const isOneConductorLoad = conductorLoad === "one";

  console.log(isOneConductorLoad);

  return availableCables.map((cableName) => {
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

    const numbersByInstallationType = veinMode?.find(
      (number) =>
        number.installationType === installationType &&
        number.numberOfPhases === powerParameters.numberOfPhases,
    );

    const crossSectionOfVein = numbersByInstallationType?.numbers.find(
      (number, index, arr) => {
        const nextNumber = arr[index + 1]?.loadCurrent ?? Infinity;

        if (nextNumber > load && arr[index + 1]?.loadCurrent !== null) {
          console.log(number.loadCurrent);
          return number.loadCurrent;
        }
      },
    )?.crossSectionOfVein;

    console.log(
      `Cable name: ${cableName}, cross section of vein: ${crossSectionOfVein}`,
    );

    return {
      cableName,
      crossSectionOfVein: `${multiplier}${crossSectionOfVein}`,
      numberOfVeins:
        numbersByInstallationType?.liczbaZyliObciazonychPradowo ?? 0,
      load,
      installationType,
      mountLocalisation,
    };
  });
};
