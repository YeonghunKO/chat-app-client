import Image from "next/image";
import React, { useContext } from "react";
import { SocketCotext } from "../common/CallingContext";

const IncomingCall = () => {
  const {
    rejectUser,
    answerUser,
    call: { callerInfo },
  } = useContext(SocketCotext);

  return (
    <div className="absolute bottom-3 left-1/2 z-[99] flex h-fit w-fit -translate-x-1/2 items-center justify-start border-2 border-teal-800 bg-panel-header-background p-3">
      <div className="flex items-center gap-[20px]">
        <div className="relative h-[80px] w-[55px] rounded-sm md:h-[80px] md:w-[80px]">
          {callerInfo && (
            <Image
              className="!relative"
              src={callerInfo.profilePicture as string}
              alt="incoming-profile-picture"
              fill
            />
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <div>
            <div className="text-[15px] font-bold md:text-[20px]">
              {callerInfo && callerInfo.name}
            </div>
            <div>incoming call</div>
          </div>
          <div className="flex gap-[6px]">
            <button
              onClick={answerUser}
              className="rounded-full bg-green-700 px-[10px] py-[3px] md:px-[15px] md:py-[2px]"
            >
              accept
            </button>
            <button
              onClick={rejectUser}
              className="rounded-full bg-red-700 px-[10px] py-[3px] md:px-[15px] md:py-[2px]"
            >
              reject
            </button>
          </div>
        </div>
        <div className="relative h-[80px] w-[55px] rounded-sm bg-conversation-panel-background md:h-[80px] md:w-[80px]">
          <Image
            sizes="100%"
            src="/chat.gif"
            className="!relative"
            alt="calling"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
