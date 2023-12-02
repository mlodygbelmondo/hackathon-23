/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type RefObject, useRef, useState } from "react";
import { mapOptions } from "~/utils/mapOptions";
import GoogleMap from "google-maps-react-markers";
import { DEFAULT_MAP_CENTER, MAP_ZOOM } from "~/utils/consts";
import Marker from "./Marker";
import { env } from "~/env";

const Map = ({ requests }: { requests: any }) => {
  const mapRef = useRef<google.maps.Map>();
  const [, setMapReady] = useState(false);

  const onGoogleApiLoaded = ({ map }: { map: google.maps.Map }) => {
    if (!map) return;

    mapRef.current = map;
    setMapReady(true);
  };

  const onMarkerClick = (lat: number, lng: number) => {
    if (!mapRef.current) return;

    mapRef.current.setCenter({
      lat,
      lng,
    });
    mapRef.current.setZoom(MAP_ZOOM.REPORT);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const onMapChange = (e: any) => {
  //   const [lng, lat] = e.center;

  // };

  return (
    <div className="h-[100%] w-full">
      <GoogleMap
        apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        defaultZoom={MAP_ZOOM.DEFAULT}
        ref={mapRef as unknown as RefObject<HTMLDivElement>}
        options={mapOptions}
        defaultCenter={DEFAULT_MAP_CENTER}
        onGoogleApiLoaded={onGoogleApiLoaded}
      />
    </div>
  );
};

export default Map;
