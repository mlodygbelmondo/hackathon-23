import { FaLocationDot } from "react-icons/fa6";

interface Props {
  lat: number;
  lng: number;
  onClick: (lat: number, lng: number) => void;
}
const Marker = ({ lat, lng, onClick }: Props) => {
  return (
    <div
      className="flex h-8 w-8 -translate-x-4 -translate-y-4 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-125"
      onClick={() => onClick(lat, lng)}
    >
      <FaLocationDot className="text-2xl" />
    </div>
  );
};
export default Marker;
