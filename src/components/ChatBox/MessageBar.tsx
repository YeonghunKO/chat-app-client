import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { FaMicrophone } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import React, { useCallback, useState } from "react";
import {
  useAddMessageQueryForChat,
  useGetMessagesQueryForChat,
} from "@/hooks/useQueryAccount";
import Input from "../common/Input";

const MessageBar = () => {
  const [message, setMessage] = useState("");

  const { mutate } = useAddMessageQueryForChat({});

  const handleSendMessage = () => {
    mutate(message);
    setMessage("");
  };

  const handleControllMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onEnterForInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutate(message);
      setMessage("");
    }
  };

  return (
    <div className="relative flex h-20 items-center gap-6 bg-panel-header-background  px-4">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="cursor-pointer text-xl text-panel-header-icon"
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
            className="cursor-pointer text-xl text-panel-header-icon"
            title="Attach"
            //   onClick={() => setGrabImage(true)}
          />
        </div>
        <div className="flex h-10 w-full items-center rounded-lg">
          <Input
            setValue={setMessage}
            value={message}
            placeholder="Type a message"
            onKeyDown={onEnterForInput}
            onChange={handleControllMessage}
          />
        </div>
        <div className=" flex w-10 items-center justify-center gap-2">
          <FaMicrophone
            className="cursor-pointer text-xl text-panel-header-icon"
            title="Record"
            // onClick={() => setShowAudioRecorder(true)}
          />
          <MdSend
            className="cursor-pointer text-xl text-panel-header-icon"
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
