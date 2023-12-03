import clsx from "clsx";
import { FaLocationDot } from "react-icons/fa6";

interface Props {
  lat: number;
  lng: number;
  id: number;
  onClick: (lat: number, lng: number, id: number) => void;
  isSelected: boolean;
}
const Marker = ({ lat, lng, id, onClick, isSelected }: Props) => {
  return (
    <div
      className="flex h-8 w-8 -translate-x-4 -translate-y-4 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-125"
      onClick={() => onClick(lat, lng, id)}
    >
      <FaLocationDot
        className={clsx(
          "text-2xl",
          isSelected ? "text-red-600" : "text-pink-700",
        )}
      />
    </div>
  );
};
export default Marker;
