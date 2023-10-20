import React, { useContext } from "react";
import { ContextProvider, SocketCotext } from "../common/CallingContext";
import IncomingCall from "./IncomingCall";
import ConnectingCall from "./ConnectingCall";
import ConnectedCall from "./ConnectedCall";

const CallingContainer = () => {
  const { callAccepted, call, callEnded, isStartCalling } =
    useContext(SocketCotext);

  return (
    <>
      {isStartCalling && <ConnectingCall />}
      {callAccepted && !callEnded && <ConnectedCall />}
      {call.isRecieving && <IncomingCall />}
    </>
  );
};

export default CallingContainer;
