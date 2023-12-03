import Image from "next/image";
import { type Request } from "~/interfaces/common";

import { TiTick } from "react-icons/ti";
import { MdCable } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { openToast } from "~/utils/toasts";
import { selectedRequestAtom } from "~/atom/common";
import { useAtom } from "jotai";
import clsx from "clsx";
import { twMerge } from "tw-merge";
interface Props {
  request: Request;
  isAdmin?: boolean;
}

const RequestCard = ({ request, isAdmin }: Props) => {
  const [selectedRequest, setSelectedRequest] = useAtom(selectedRequestAtom);

  const onAcceptClick = () => {
    openToast({
      message: "Zgłoszenie zostało zaakceptowane.",
      type: "success",
    });
  };

  const onDenyClick = () => {
    openToast({
      message: "Zgłoszenie zostało odrzucone.",
      type: "info",
    });
  };

  return (
    <div
      className={twMerge(
        clsx(
          "card w-full border-2 border-neutral bg-neutral text-neutral-content transition-colors sm:w-[96%]",
          selectedRequest === request.id
            ? "shadow-border-gray-300 border-2 border-gray-300 shadow"
            : "cursor-pointer",
        ),
      )}
      onClick={() => setSelectedRequest(request.id)}
    >
      <div className="card-body w-full items-center px-3 py-3 text-center lg:px-8">
        <div className="flex w-full gap-3 lg:gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-base-300 bg-white shadow shadow-gray-600">
            <Image
              src="https://www.nkt.com.pl/imgproxy/pvTKGdlM1jMXCaTNdveZkfkGvqW0F0bj4y-B_1VweQM/rt:fit/w:378/h:294/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvMmV1cXgzNm1waS9wbmcvWURZxbxvXzN4MSw1X3MucG5nP2xhc3RNb2RpZmllZD1UdWUrTWFyKzA4KzE0JTNBMjElM0ExNitDRVQrMjAyMg.jpeg"
              alt="halo"
              width={64}
              height={64}
            />
          </div>
          <div className="flex w-[calc(100%-64px)] justify-between">
            <div className="flex flex-col justify-between">
              <p className="flex items-center gap-1 text-sm font-bold lg:gap-2">
                <MdCable /> {request.cableName}
              </p>
              <p className="flex items-center gap-1 text-xs font-bold lg:gap-2">
                <FaCalendar /> {request.date}
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="flex items-center gap-1 text-xs font-medium lg:gap-2">
                <IoPerson /> Piotr Kaczorowski
              </p>
              <p className="flex items-center gap-1 text-xs font-medium lg:gap-2">
                <FaLocationDot /> Gliwice
              </p>
            </div>
          </div>
        </div>
        {isAdmin ? (
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={onAcceptClick}>
              Przyjmij
            </button>
            <button className="btn btn-ghost" onClick={onDenyClick}>
              Odrzuć
            </button>
          </div>
        ) : (
          // @ todo zmienilbym to na jakis status zgloszenia czy cos bo user widzi wszystkie zgloszenia swoje imo, admin tylko aktywne, i user powinien miec info o tym co jest przyjete a co nie
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <TiTick /> Zgłoszenie przyjęte
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default RequestCard;
