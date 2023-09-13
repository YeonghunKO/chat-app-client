import { BsCheck, BsCheckAll } from "react-icons/bs";

type IStatus = { status: "read" | "delivered" | "sent" };

const Status = ({ status }: IStatus) => {
  return (
    <span className="flex items-end">
      {status === "sent" && <BsCheck className="text-lg" />}
      {status === "delivered" && <BsCheckAll className="text-lg" />}
      {status === "read" && (
        <BsCheckAll className="self-end text-lg text-icon-ack" />
      )}
    </span>
  );
};

export default Status;
