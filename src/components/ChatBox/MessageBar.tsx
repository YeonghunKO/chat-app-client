import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { FaMicrophone } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import React, { useState } from "react";
import { useAddMessageQueryForChat } from "@/hooks/useQueryAccount";
import Input from "../common/Input";
import { useUiState } from "@/store";
import { TOAST_TYPE } from "@/constant/type";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const setAlertMessage = useUiState((set) => set.updateToastInfo);

  const { mutate } = useAddMessageQueryForChat({
    onError: () => {
      setAlertMessage({
        type: TOAST_TYPE.ERROR,
        msg: "Error while sending message",
      });
    },
  });

  const handleSendMessage = () => {
    if (message) {
      mutate(message);
      setMessage("");
    }
  };

  const handleControllMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onEnterForInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (message) {
        mutate(message);

        setMessage("");
      }
    }
  };

  return (
    <div className="relative flex h-20 items-center gap-3 bg-panel-header-background  px-4">
      <>
        <div className="flex gap-4">
          <BsEmojiSmile
            className="cursor-pointer text-[20px] text-panel-header-icon"
            title="Emoji"
            //   onClick={handleEmojiModal}
            id="emoji-open"
          />
          {/* {showEmojiPicker && (
          <div
            className="absolute bottom-24 left-16 z-40"
            ref={emojiPickerRef}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )} */}
          <ImAttachment
            className="cursor-pointer text-[20px] text-panel-header-icon"
            title="Attach"
            //   onClick={() => setGrabImage(true)}
          />
        </div>
        <div className="flex h-10 w-full items-center rounded-lg">
          <Input
            setValue={setMessage}
            value={message}
            placeholder="Type a message"
            onKeyUp={onEnterForInput}
            onChange={handleControllMessage}
          />
        </div>
        <div className="flex items-center gap-3">
          <FaMicrophone
            className="cursor-pointer text-[20px] text-panel-header-icon"
            title="Record"
            // onClick={() => setShowAudioRecorder(true)}
          />
          <MdSend
            className="cursor-pointer text-[20px] text-panel-header-icon"
            title="Send"
            onClick={handleSendMessage}
          />
          {/* {message.length ? (
          <button
        //    onClick={sendMessage}
          >
          </button>
        ) : (
        )} */}
        </div>
      </>
      {/* {showAudioRecorder && <CaptureAudio hide={setShowAudioRecorder} />}
  {grabImage && <PhotoPicker onChange={photoPickerOnChange} />}  */}
    </div>
  );
};

export default MessageBar;
