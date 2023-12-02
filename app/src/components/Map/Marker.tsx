interface Props {
  lat: number;
  lng: number;
  onClick: (lat: number, lng: number) => void;
}
const Marker = ({ lat, lng, onClick }: Props) => {
  return (
    <div
      className="flex h-8 w-8 -translate-x-4 -translate-y-4 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr ring-4 transition-all duration-300 hover:scale-125"
      onClick={() => onClick(lat, lng)}
    >
      Marker
    </div>
  );
};
export default Marker;
