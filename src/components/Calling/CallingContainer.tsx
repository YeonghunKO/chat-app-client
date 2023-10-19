import React, { useContext } from "react";
import { ContextProvider, SocketCotext } from "../common/CallingContext";
import IncomingCall from "./IncomingCall";
import ConnectingCall from "./ConnectingCall";

const CallingContainer = () => {
  const { callAccepted, call } = useContext(SocketCotext);
  console.log("callAccepted", callAccepted);
  console.log("call", call);

  return (
    <ContextProvider>
      <IncomingCall />
      {/* <ConnectingCall /> */}
    </ContextProvider>
  );
};

export default CallingContainer;
