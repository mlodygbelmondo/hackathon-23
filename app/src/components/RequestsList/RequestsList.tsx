import type { Request } from "~/interfaces/common";
import RequestCard from "./RequestCard";

interface Props {
  requests: Request[];
}

const RequestsList = ({ requests }: Props) => {
  return (
    <div className="flex h-[540px] w-[45%] flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white pt-4 shadow-xl shadow-gray-100">
      <p className="w-full px-8 text-left text-2xl font-bold text-gray-900">
        Aktywne zgłoszenia
      </p>
      <div className="h-0.5 w-[90%] rounded-full bg-gray-200 px-8" />
      <div className="flex h-full w-full flex-col items-center gap-2 overflow-auto px-8 pb-2 pt-1">
        {requests.map((request, i) => (
          <RequestCard request={request} key={i} />
        ))}
      </div>
    </div>
  );
};
export default RequestsList;
