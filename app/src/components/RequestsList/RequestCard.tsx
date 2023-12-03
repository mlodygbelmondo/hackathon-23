import Image from "next/image";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useAtom } from "jotai";
import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdCable, MdOutlinePending } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { twMerge } from "tw-merge";
import {
  _getResultForRequest,
  _updateRequestState,
  type Request,
} from "~/api/request";
import { selectedRequestAtom } from "~/atom/common";
import { openToast } from "~/utils/toasts";
interface Props {
  request: Request;
  isAdmin?: boolean;
}

const RequestCard = ({ request, isAdmin }: Props) => {
  const [selectedRequest, setSelectedRequest] = useAtom(selectedRequestAtom);

  const client = useQueryClient();

  const { data: result } = useQuery({
    queryKey: ["result", request.resultId],
    queryFn: () => _getResultForRequest(request.resultId),
  });

  const { mutateAsync: updateRequestState } = useMutation({
    mutationKey: ["accept", request.id],
    mutationFn: (state: 1 | 2) => _updateRequestState(request.id, state),
    onSuccess: () => {
      client.refetchQueries({
        queryKey: ["requests"],
        type: "active",
      });
    },
  });

  const onAcceptClick = async () => {
    await updateRequestState(1);
    openToast({
      message: "Zgłoszenie zostało zaakceptowane.",
      type: "success",
    });
  };

  const onDenyClick = async () => {
    await updateRequestState(2);
    openToast({
      message: "Zgłoszenie zostało odrzucone.",
      type: "info",
    });
  };

  console.log(request.latitude, request.longitude);

  const { data } = useQuery({
    queryKey: ["geocode", request.resultId],
    queryFn: () =>
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${request.latitude},${request.longitude}&sensor=true&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
      ).then((res) => res.json()),
  });

  console.log(data?.results[0].formatted_address);
  return result ? (
    <div
      className={twMerge(
        clsx(
          "card border-neutral bg-neutral text-neutral-content w-full border-2 transition-colors sm:w-[96%]",
          selectedRequest === request.id
            ? "shadow-border-gray-300 border-2 border-gray-300 shadow"
            : "cursor-pointer",
        ),
      )}
      onClick={() => setSelectedRequest(request.id)}
    >
      <div className="card-body w-full items-center px-3 py-3 text-center lg:px-8">
        <div className="flex w-full gap-3 lg:gap-4">
          <div className="border-base-300 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-white shadow shadow-gray-600">
            <a
              className="mt-2 text-blue-700"
              target="_blank"
              href={result.link}
            >
              <Image src={result.linkPhoto} alt="halo" width={64} height={64} />
            </a>
          </div>
          <div className="flex w-[calc(100%-64px)] justify-between">
            <div className="flex flex-col justify-between">
              <p className="flex items-center gap-1 text-sm font-bold lg:gap-2">
                <MdCable /> {result.cableType}
              </p>
              <p className="flex items-center gap-1 text-xs font-bold lg:gap-2">
                <FaCalendar /> {new Date(request.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="flex items-center gap-1 text-xs font-medium lg:gap-2">
                <IoPerson /> {request.firstName} {request.lastName}
              </p>
              <p className="flex items-center gap-1 text-xs font-medium lg:gap-2">
                {/* @ todo/piotr - change it to fetch city based on latitude longitude */}
                <FaLocationDot /> {data?.results[0].formatted_address}
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
          // @ todo/piotr - zmienilbym to na jakis status zgloszenia czy cos bo user widzi wszystkie zgloszenia swoje imo, admin tylko aktywne, i user powinien miec info o tym co jest przyjete a co nie
          <div className="card-actions justify-end">
            <div
              className={`btn ${
                request.requestState === 0
                  ? "bg-yellow-700"
                  : request.requestState === 1
                    ? "bg-green-600"
                    : "bg-red-600"
              }`}
            >
              {request.requestState === 0 ? (
                <MdOutlinePending />
              ) : request.requestState === 1 ? (
                <TiTick />
              ) : (
                <RxCrossCircled />
              )}
              {request.requestState === 0
                ? "Zgłoszenie w trakcie rozpatrywania"
                : request.requestState === 1
                  ? "Zgłoszenie zaakceptowane"
                  : "Zgłoszenie odrzucone"}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};
export default RequestCard;
