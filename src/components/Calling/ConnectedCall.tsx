import React, { useContext } from "react";
import { SocketCotext } from "../common/CallingContext";
import { MdOutlineCallEnd } from "react-icons/md";

const ConnectedCall = () => {
  const { myVideo, userVideo, cancelUser } = useContext(SocketCotext);

  return (
    <div className="absolute left-1/2 top-1/2 z-[99] flex h-[80dvh] w-[80dvw] -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-outgoing-background  bg-conversation-panel-background">
      <div className="flex h-[80%] w-[80%] flex-col items-center gap-[30px]">
        <div>
          <h1 className="text-[30px]">On the phone with Harry</h1>
        </div>
        <div className="flex  h-full w-full items-center justify-center gap-[20px]">
          <div className="h-full w-full">
            <video
              playsInline
              ref={myVideo}
              autoPlay
              muted
              className="h-full w-full border-2 border-zinc-700 object-fill"
            />
          </div>
          <div className="h-full w-full">
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="h-full w-full border-2 border-zinc-700 object-fill"
            />
          </div>
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

export default ConnectedCall;
