import React, { useContext } from "react";
import { ContextProvider, SocketCotext } from "../common/CallingContext";
import IncomingCall from "./IncomingCall";
import ConnectingCall from "./ConnectingCall";
import { useCallStore } from "@/store";

const CallingContainer = () => {
  const { callAccepted, call } = useContext(SocketCotext);
  const isStartCalling = useCallStore((set) => set.isStartCalling);
  console.log("callAccepted", callAccepted);
  console.log("call", call);

  return (
    <>
      {/* <IncomingCall /> */}
      <ConnectingCall />
    </>
  );
};

export default CallingContainer;
