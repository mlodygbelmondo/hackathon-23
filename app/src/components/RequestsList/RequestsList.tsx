import { type Request } from "../../api/request";
import RequestCard from "./RequestCard";

interface Props {
  requests: Request[];
  isAdmin?: boolean;
}

const RequestsList = ({ requests, isAdmin = false }: Props) => {
  return (
    <div className="mr-0 flex h-full w-full flex-col items-center gap-2 rounded-2xl border border-stone-600 bg-base-200 px-2 pt-4 shadow-sm shadow-gray-400 lg:mr-2 lg:w-[45%] lg:px-0">
      <p className="w-full px-8 text-left text-2xl font-bold">
        {isAdmin ? "Aktywne zgłoszenia" : "Twoje zgłoszenia"}
      </p>
      <div className="h-0.5 w-[90%] rounded-full bg-gray-500 px-8" />
      <div className="flex h-full w-full flex-col items-center gap-2 overflow-auto px-3 pb-2 pt-1 sm:px-8">
        {requests.map((request, i) => (
          <RequestCard request={request} isAdmin={isAdmin} key={i} />
        ))}
      </div>
    </div>
  );
};
export default RequestsList;
