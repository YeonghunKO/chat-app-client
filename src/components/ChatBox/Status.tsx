import { BsCheck, BsCheckAll } from "react-icons/bs";

type IStatus = { status: "read" | "delivered" | "sent" };

const Status = ({ status }: IStatus) => {
  return (
    <span className="flex items-end">
      {status === "sent" && <BsCheck className="text-[15px]" />}
      {status === "delivered" && <BsCheckAll className="text-[15px]" />}
      {status === "read" && (
        <BsCheckAll className="self-end text-[15px] text-icon-ack" />
      )}
    </span>
  );
};

export default Status;
