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

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-1/2">
        {step === 1 && (
          <TypeOfMetalDetails
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                typeOfMetal: e.target.value,
              }));
            }}
            valueInput={formData.typeOfMetal}
            nextStep={() => setStep((prev) => prev + 1)}
          />
        )}
        {step === 2 && (
          <TypeOfInsulatingMaterial
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                typeOfInsulatingMaterial: e.target.value,
              }));
            }}
            valueInput={formData.typeOfInsulatingMaterial}
            nextStep={() => setStep((prev) => prev + 1)}
            previousStep={() => setStep((prev) => prev - 1)}
          />
        )}
        {step === 3 && (
          <NumberOfLoadedVeins
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                numberOfLoadedVeins: e.target.value,
              }));
            }}
            valueInput={formData.numberOfLoadedVeins}
            nextStep={() => setStep((prev) => prev + 1)}
            previousStep={() => setStep((prev) => prev - 1)}
          />
        )}
        {step === 4 && (
          <InstalationMethod
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                instalationMethod: e.target.value,
              }));
            }}
            valueInput={formData.instalationMethod}
            nextStep={() => setStep((prev) => prev + 1)}
            previousStep={() => setStep((prev) => prev - 1)}
          />
        )}
        {step === 5 && (
          <AmbientTemperature
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                ambientTemperature: e.target.value,
              }));
            }}
            valueInput={formData.ambientTemperature}
            nextStep={() => setStep((prev) => prev + 1)}
            previousStep={() => setStep((prev) => prev - 1)}
          />
        )}
        {step === 6 && (
          <ThermalResistivityOfTheSoil
            handleInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData((prevDetails) => ({
                ...prevDetails,
                thermalResistivityOfTheSoil: e.target.value,
              }));
            }}
            previousStep={() => setStep((prev) => prev - 1)}
          />
        )}
      </form>
    </div>
  );
};

export default FormPage;
