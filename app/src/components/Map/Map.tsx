/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import GoogleMap from "google-maps-react-markers";
import { useAtom } from "jotai";
import { useEffect, useRef, useState, type RefObject } from "react";
import { selectedRequestAtom } from "~/atom/common";
import { env } from "~/env";
import { DEFAULT_MAP_CENTER, MAP_ZOOM } from "~/utils/consts";
import { mapOptions } from "~/utils/mapOptions";
import { type Request } from "../../api/request";
import Marker from "./Marker";

const Map = ({ requests }: { requests: Request[] }) => {
  const [selectedRequest, setSelectedRequest] = useAtom(selectedRequestAtom);
  const mapRef = useRef<google.maps.Map>();
  const [, setMapReady] = useState(false);

  const onGoogleApiLoaded = ({ map }: { map: google.maps.Map }) => {
    if (!map) return;

    mapRef.current = map;
    setMapReady(true);
  };

  const onMarkerClick = (lat: number, lng: number, id: number) => {
    if (!mapRef.current?.setCenter) return;

    mapRef.current.setCenter({
      lat,
      lng,
    });
    mapRef.current.setZoom(MAP_ZOOM.REQUEST);

    setSelectedRequest(id);
  };

  useEffect(() => {
    if (!selectedRequest || !mapRef.current?.setCenter) return;

    const request = requests.find((r) => r.id === selectedRequest);

    if (!request) return;

    mapRef.current.setCenter({
      lat: request.latitude,
      lng: request.longitude,
    });
    mapRef.current.setZoom(MAP_ZOOM.REQUEST);
  }, [selectedRequest]);

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
      >
        {requests.map((request, i) => (
          <Marker
            key={i}
            lat={request.latitude}
            lng={request.longitude}
            id={request.id}
            onClick={onMarkerClick}
            isSelected={selectedRequest === request.id}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
