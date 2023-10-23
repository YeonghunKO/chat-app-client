import React, { useContext } from "react";
import { SocketCotext } from "../common/CallingContext";
import IncomingCall from "./IncomingCall";
import ConnectingCall from "./ConnectingCall";
import ConnectedCall from "./ConnectedCall";

const CallingContainer = () => {
  const { call, callEnded, isStartCalling } = useContext(SocketCotext);
  return (
    <>
      {isStartCalling && <ConnectingCall />}
      {!callEnded && <ConnectedCall />}
      {call.isRecieving && <IncomingCall />}
    </>
  );
};

export default CallingContainer;
