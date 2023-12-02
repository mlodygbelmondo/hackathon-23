export interface Cable {
  name: string;
  link: string;
  length: number;
  type: string;
  status: string;
  color: string;
}

export interface Request {
  id: number;
  lat: number;
  lng: number;
  cable: Cable;
}
