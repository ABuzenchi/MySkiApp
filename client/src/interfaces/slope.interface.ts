export interface Slope {
  _id: string;
  name: string;
  domainId: string | {
    _id: string;
    name: string;
    location?: string;
    website?: string;
  };
  geoLocation: {
    type: "Point";
    coordinates: [number, number]; // [lat, lng]
  };
  length: number;
  difficulty: "easy" | "medium" | "difficult";
  width: number;
  baseElevation: number;
  topElevation: number;
  status: string;
}
