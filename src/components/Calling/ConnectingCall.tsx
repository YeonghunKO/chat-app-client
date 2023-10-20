import React, { useContext } from "react";
import { SocketCotext } from "../common/CallingContext";
import Image from "next/image";
import { MdOutlineCallEnd } from "react-icons/md";

const ConnectingCall = () => {
  const { call, cancelUser } = useContext(SocketCotext);

  console.log(call);
  return (
    <div className="absolute left-1/2 top-1/2 z-[99] flex h-[80dvh] w-[80dvw] -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-outgoing-background  bg-conversation-panel-background">
      <div className="flex h-[80%] w-[80%] flex-col items-center gap-[30px]">
        <div className="text-center">
          <h1 className="text-[50px]">{call.callerInfo?.name}</h1>
          <h2>calling</h2>
        </div>
        <div className="h-[70%] w-[70%]">
          {call.callerInfo && (
            <Image
              src={call.callerInfo.profilePicture as string}
              alt="harry"
              fill
              className="!relative"
            />
          )}
        </div>
        <button
          className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600"
          onClick={cancelUser}
        >
          <MdOutlineCallEnd className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default ConnectingCall;
