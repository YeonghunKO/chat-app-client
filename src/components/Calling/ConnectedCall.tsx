import React, { useContext } from "react";
import { SocketCotext } from "../common/CallingContext";
import { MdOutlineCallEnd } from "react-icons/md";

const ConnectedCall = () => {
  const { myVideo, userVideo, cancelUser, call } = useContext(SocketCotext);

  return (
    <div className="absolute left-1/2 top-1/2 z-[99] flex h-[90dvh] w-[90dvw] -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-outgoing-background bg-conversation-panel-background py-[10px]">
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-[30px] md:w-[80%] md:gap-[30px]">
        <div>
          <h1 className="text-center text-[20px] md:text-[30px]">
            On the phone with <br /> <b>{call.callerInfo?.name}</b>
          </h1>
        </div>
        <div className="flex  flex-col items-center justify-center gap-[20px] md:flex-row">
          <video
            playsInline
            ref={myVideo}
            autoPlay
            muted
            className="h-[25dvh] w-[400px] border-2 border-zinc-700 object-fill md:h-[400px] md:w-[300px] lg:w-[40dvw]"
          />
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className="h-[25dvh] w-[400px] border-2 border-zinc-700 object-fill md:h-[400px] md:w-[300px] lg:w-[40dvw]"
          />
        </div>
        <button
          className="flex h-[40px] w-[60px] items-center justify-center rounded-full bg-red-600"
          onClick={cancelUser}
        >
          <MdOutlineCallEnd className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default ConnectedCall;
