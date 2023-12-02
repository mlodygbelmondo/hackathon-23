import Image from "next/image";

interface Props {}
const RequestsList = ({}: Props) => {
  return (
    <div className="z-max flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border">
      <Image
        src="https://www.nkt.com.pl/imgproxy/pvTKGdlM1jMXCaTNdveZkfkGvqW0F0bj4y-B_1VweQM/rt:fit/w:378/h:294/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvMmV1cXgzNm1waS9wbmcvWURZxbxvXzN4MSw1X3MucG5nP2xhc3RNb2RpZmllZD1UdWUrTWFyKzA4KzE0JTNBMjElM0ExNitDRVQrMjAyMg.jpeg"
        alt="halo"
        className="z-1"
        width={64}
        height={64}
      />
    </div>
  );
};
export default RequestsList;
