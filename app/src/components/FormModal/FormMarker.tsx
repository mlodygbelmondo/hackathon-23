import clsx from "clsx";
import { FaLocationDot } from "react-icons/fa6";

interface Props {
  lat: number;
  lng: number;
}
const Marker = ({ lat, lng }: Props) => {
  return (
    <div
      className="flex h-8 w-8 -translate-x-4 -translate-y-4 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-125"
      lat={lat}
      lng={lng}
    >
      <FaLocationDot className={"text-2xl text-pink-700"} />
    </div>
  );
};
export default Marker;
