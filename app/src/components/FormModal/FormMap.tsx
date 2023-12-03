/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import GoogleMap from "google-maps-react-markers";
import { useRef, useState, type RefObject } from "react";
import { env } from "~/env";
import { MAP_ZOOM } from "~/utils/consts";
import { mapOptions } from "~/utils/mapOptions";
import Marker from "./FormMarker";

const FormMap = ({
  formData2,
  setFormData2,
}: {
  formData2: {
    lat: number;
    lng: number;
    firstName: string;
    lastName: string;
  };
  setFormData2: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
      firstName: string;
      lastName: string;
    }>
  >;
}) => {
  const { lat, lng } = formData2;
  const mapRef = useRef<google.maps.Map>();
  const [, setMapReady] = useState(false);

  const onGoogleApiLoaded = ({ map }: { map: google.maps.Map }) => {
    if (!map) return;

    mapRef.current = map;
    setMapReady(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMapChange = (e: any) => {
    const [lng, lat] = e.center;

    setFormData2((prev) => ({
      ...prev,
      lat,
      lng,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const onMapChange = (e: any) => {
  //   const [lng, lat] = e.center;

  // };

  return (
    <div className="h-[100%] w-full">
      <GoogleMap
        apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        defaultZoom={MAP_ZOOM.REQUEST}
        ref={mapRef as unknown as RefObject<HTMLDivElement>}
        options={mapOptions}
        defaultCenter={{
          lat,
          lng,
        }}
        onChange={onMapChange}
        onGoogleApiLoaded={onGoogleApiLoaded}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMap>
    </div>
  );
};

export default FormMap;
