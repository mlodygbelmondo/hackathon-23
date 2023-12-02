import AmbientTemperature from "components/form/AmbientTemperature";
import InstalationMethod from "components/form/InstallationMethod";
import NumberOfLoadedVeins from "components/form/NumberOfLoadedVeins";
import ThermalResistivityOfTheSoil from "components/form/ThermalResistivityOfTheSoil";
import TypeOfInsulatingMaterial from "components/form/TypeOfInsulatingMaterial";
import TypeOfMetalDetails from "components/form/TypeOfMetalDetails";
import { useState } from "react";

export interface initialDataProps {
  typeOfMetal: string;
  typeOfInsulatingMaterial: string;
  numberOfLoadedVeins: string;
  instalationMethod: string;
  ambientTemperature: string;
  thermalResistivityOfTheSoil: string;
}

const initialData = {
  typeOfMetal: "",
  typeOfInsulatingMaterial: "",
  numberOfLoadedVeins: "",
  instalationMethod: "",
  ambientTemperature: "",
  thermalResistivityOfTheSoil: "",
};

const FormPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<initialDataProps>(initialData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);

  const renderCurrentFormStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <TypeOfMetalDetails
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                typeOfMetal: e.target.value,
              }));
            }}
            valueInput={formData.typeOfMetal}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <TypeOfInsulatingMaterial
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                typeOfInsulatingMaterial: e.target.value,
              }));
            }}
            valueInput={formData.typeOfInsulatingMaterial}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );
      case 3:
        return (
          <NumberOfLoadedVeins
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                numberOfLoadedVeins: e.target.value,
              }));
            }}
            valueInput={formData.numberOfLoadedVeins}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );
      case 4:
        return (
          <InstalationMethod
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                instalationMethod: e.target.value,
              }));
            }}
            valueInput={formData.instalationMethod}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );
      case 5:
        return (
          <AmbientTemperature
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                ambientTemperature: e.target.value,
              }));
            }}
            valueInput={formData.ambientTemperature}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );
      case 6:
        return (
          <ThermalResistivityOfTheSoil
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                thermalResistivityOfTheSoil: e.target.value,
              }));
            }}
            previousStep={previousStep}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="pb-4 text-3xl">Formularz zgłoszeniowy</h1>
      <form onSubmit={handleSubmit} className="w-1/2">
        {renderCurrentFormStep(step)}
      </form>
    </div>
  );
};

export default FormPage;
