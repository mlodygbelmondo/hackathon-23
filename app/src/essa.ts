import { writeFileSync } from "fs";

const XD = [
  {
    "4": 31,
    "6": 40,
    "10": 54,
    "16": 73,
    "25": 95,
    "35": 117,
    "50": 141,
    "70": 179,
    "95": 216,
    "120": 249,
    "150": 285,
    "185": 324,
    "240": 380,
    "300": 435,
    obwód: "3 fazowy",
    "liczba żył w kablu": 1,
    "liczba żył obciążonych prądowo": 3,
    "metoda referencyjna": "A1",
    "przekrój żyły": "obciążalność prądowa",
    "1,5": 17,
    "2,5": 23,
  },
  {
    "4": 37,
    "6": 48,
    "10": 66,
    "16": 88,
    "25": 117,
    "35": 144,
    "50": 175,
    "70": 222,
    "95": 269,
    "120": 312,
    "150": 342,
    "185": 384,
    "240": 450,
    "300": 514,
    obwód: "3 fazowy",
    "liczba żył w kablu": "31-gru",
    "liczba żył obciążonych prądowo": 3,
    "metoda referencyjna": "B1",
    "przekrój żyły": "obciążalność prądowa",
    "1,5": 20,
    "2,5": 28,
  },
  {
    "4": 44,
    "6": 56,
    "10": 77,
    "16": 102,
    "25": 138,
    "35": 170,
    "50": 207,
    "70": 263,
    "95": 325,
    "120": 380,
    "150": 437,
    "185": 507,
    "240": 604,
    "300": 697,
    obwód: "3 fazowy",
    "liczba żył w kablu": 1,
    "liczba żył obciążonych prądowo": 3,
    "metoda referencyjna": "F",
    "przekrój żyły": "obciążalność prądowa",
    "1,5": 26,
    "2,5": 34,
  },
];

const res = XD.map((item) => {
  const installationMethod = item["metoda referencyjna"] ?? null;
  const veinCrossing = item["przekrój żyły"] ?? null;
  const liczbaZyli = item["liczba żył"] ?? item["liczba żył w kablu"] ?? null;
  const liczbaZyliObciazonychPradowo =
    item["liczba żył obciążonych prądowo"] ?? null;
  const circuit = item.obwód ?? null;

  const numbers = Object.keys(item)
    .filter(
      (key) =>
        key !== "metoda referencyjna" &&
        key !== "przekrój żyły" &&
        key !== "obwód" &&
        key !== "liczba żył" &&
        key !== "liczba żył w kablu" &&
        key !== "liczba żył obciążonych prądowo",
    )
    .map((key) => ({
      loadCurrent:
        (typeof item[key] === "number"
          ? item[key]
          : parseFloat(item[key].replace(",", "."))) ?? null,
      crossSectionOfVein: key,
    }))
    .sort((a, b) => a.loadCurrent - b.loadCurrent);

  return {
    installationType: installationMethod,
    numberOfPhases: parseInt(circuit.split(" ")[0]),
    veinCrossing,
    liczbaZyli,
    liczbaZyliObciazonychPradowo,
    numbers,
  };
});
const title = "N2XH-jednozylowy";

writeFileSync(`kable/${title}.json`, JSON.stringify(res));
