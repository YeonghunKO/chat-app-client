import { TMEssageStatus } from "@/type";
import { BsCheck, BsCheckAll } from "react-icons/bs";

type IStatus = { status: TMEssageStatus };

const Status = ({ status }: IStatus) => {
  return (
    <span className="flex items-end text-[15px]">
      {status === "sent" && <BsCheck />}
      {status === "delivered" && <BsCheckAll />}
      {status === "read" && <BsCheckAll className="self-end text-icon-ack" />}
    </span>
  );
};

export default Status;
