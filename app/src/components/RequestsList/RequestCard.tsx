import Image from "next/image";
import { type Request } from "~/interfaces/common";
import { TbTruckDelivery } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
interface Props {
  request: Request;
}

const RequestCard = ({ request }: Props) => {
  const [isDeliveryClicked, setIsDeliveryClicked] = useState(false);

  const handleDeliveryClick = () => {
    setIsDeliveryClicked(!isDeliveryClicked);
  };

  return (
    <div className="mx-4 flex w-full cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white px-2 py-1 shadow shadow-gray-200 transition-all hover:scale-105">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white">
        <Image
          src="https://www.nkt.com.pl/imgproxy/pvTKGdlM1jMXCaTNdveZkfkGvqW0F0bj4y-B_1VweQM/rt:fit/w:378/h:294/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvMmV1cXgzNm1waS9wbmcvWURZxbxvXzN4MSw1X3MucG5nP2xhc3RNb2RpZmllZD1UdWUrTWFyKzA4KzE0JTNBMjElM0ExNitDRVQrMjAyMg.jpeg"
          alt="halo"
          width={80}
          height={80}
        />
      </div>
      <div className="flex w-[calc(100%-80px)] items-center justify-between gap-2 p-1">
        <div className="flex flex-col gap-2">
          <p className="text-md font-bold text-gray-900">{request.cableName}</p>
          <p className="text-sm font-medium text-gray-500">{request.date}</p>
        </div>
        <div className="flex gap-2">
          <button
            className={`${
              isDeliveryClicked ? "hidden" : "flex"
            } transition-all`}
            onClick={handleDeliveryClick}
          >
            <TbTruckDelivery className="text-lg" />
          </button>
          <div
            className={`${
              isDeliveryClicked ? "flex" : "hidden"
            } gap-4 transition-all`}
          >
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full   bg-red-500 text-white"
              onClick={handleDeliveryClick}
            >
              <RxCross2 />
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-white"
              onClick={handleDeliveryClick}
            >
              <TiTick />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RequestCard;
