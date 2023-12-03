import axios from "axios";

interface PushRequestParams {
  latitude: number;
  longitude: number;
  firstName: string;
  lastName: string;
  load: number;
  numberOfVeins: number;
  crossSectionOfVeins: string;
  installationType: string;
  mountLocation: string;
  cableName: string;
}

const cableTypeMap = {
  YDY: 0,
  YDYp: 1,
  YKY: 2,
  YKXS: 3,
  YAKXS: 4,
  N2XH: 5,
} as Record<string, number>;

const installationTypeMap = {
  A1: 0,
  A2: 1,
  B1: 2,
  B2: 3,
  E: 4,
  F: 5,
  D1: 6,
  D2: 7,
} as Record<string, number>;

const reverseInstallationTypeMap = {
  0: "A1",
  1: "A2",
  2: "B1",
  3: "B2",
  4: "E",
  5: "F",
  6: "D1",
  7: "D2",
} as Record<number, string>;

const cableTypeMapReverse = {
  0: "YDY",
  1: "YDYp",
  2: "YKY",
  3: "YKXS",
  4: "YAKXS",
  5: "N2XH",
} as Record<number, string>;

const enviromentConditionsMap = {
  air: 0,
  ground: 1,
} as Record<string, number>;

const reverseEnviromentConditionsMap = {
  0: "air",
  1: "ground",
} as Record<number, string>;

export const _pushRequest = async ({
  latitude,
  longitude,
  firstName,
  lastName,
  load,
  crossSectionOfVeins,
  installationType,
  mountLocation,
  numberOfVeins,
  cableName,
}: PushRequestParams) => {
  const res = await axios.post("http://localhost:5176/api/Result", {
    cableType: cableTypeMap[cableName],
    cableStrands: `${numberOfVeins}, ${crossSectionOfVeins}`,
    charge: load,
    installationMethod: installationTypeMap[installationType],
    environmentalConditions: enviromentConditionsMap[mountLocation],
  });

  const res2 = await axios.post("http://localhost:5176/api/Request", {
    latitude: latitude,
    longitude: longitude,
    firstName: firstName,
    lastName: lastName,
  });

  console.log(res.data);

  return res.status === 201 && res2.status === 201;
};

export interface Request {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  latitude: number;
  longitude: number;
  resultId: number;
}

export const _getAllRequests = async (): Promise<Request[]> => {
  const res = await axios.get("http://localhost:5176/api/Request/pending");
  return res.data ?? [];
};

interface Result {
  cableType: string;
  cableStrands: string;
  load: number;
  installationMethod: number;
  environmentalConditions: number;
  link: string;
  linkPhoto: string;
}

export const _getResultForRequest = async (
  resultId: number,
): Promise<Result> => {
  const res = await axios.get(`http://localhost:5176/api/Result/${resultId}`);
  const data = res.data;
  return {
    cableType: cableTypeMapReverse[data.cableType],
    cableStrands: data.cableStrands,
    load: data.charge,
    installationMethod: reverseInstallationTypeMap[data.installationMethod],
    environmentalConditions:
      reverseEnviromentConditionsMap[data.environmentalConditions],
    link: data.link,
    linkPhoto: data.linkPhoto,
  } as unknown as Result;
};

export const _updateRequestState = async (
  requestId: number,
  state: 1 | 2,
): Promise<boolean> => {
  const res = await axios.put(
    `http://localhost:5176/api/Request/${requestId}`,
    {
      requestState: state,
    },
  );
  return res.status === 201;
};
