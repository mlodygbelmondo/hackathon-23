export type CableType = "YDY" | "YDYp" | "YKY" | "YKXS" | "N2XH" | "YAKXS";
export type IsolationType = "PVC" | "XLPE" | "B2ca";

export type InstallationType =
  | "A1" // bezpośrednio w ścianie izolowanej cieplnie
  | "A2" // w rurze instalacyjnej w ścianie izolowanej cieplnie
  | "B1" // w rurze instalacyjnej na ścianie/murze - dla kabli jednożyłowych
  | "B2" // w rurze instalacyjnej na ścianie/murze - dla kabli i przewodów wielożyłowych
  | "E" // w powietrzu (np. perforowane korytko) - dla kabli i przewodów wielożyłowych
  | "F" // w powietrzu (np. perforowane korytko) - dla kabli jednożyłowych
  | "D1" // w rurze osłonowej w ziemi
  | "D2"; //bezpośrednio w ziemi

export type Environment = "air" | "ground";

export const cables: CableType[] = [
  "YDY",
  "YDYp",
  "YKY",
  "YKXS",
  "N2XH",
  "YAKXS",
];

export type NumberOfPhases = 1 | 3;

export type ConductorLoad = "one" | "two" | "multi";
