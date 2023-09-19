import React, { useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { BsImageFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Input from "../common/Input";

import {
  useAddMultiMessageQuery,
  useAddTextMessageQuery,
} from "@/hooks/useQueryAccount";
import { useUiState } from "@/store";
import { TOAST_TYPE } from "@/constant/type";

import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import useUnmountIfClickedOutside from "@/hooks/useUnmountIfClickedOutside";
import PhotoPicker from "../common/PhotoPicker";
import { ADD_IMAGE_MESSAGE } from "@/constant/api";
import { resizeFile } from "@/utils/resizeImg";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const setAlertMessage = useUiState((set) => set.updateToastInfo);

  const $emojiPicker = useRef(null);
  const $photoPicker = useRef<HTMLInputElement>(null);

  const { mutate: addTextMessage } = useAddTextMessageQuery({
    onError: () => {
      setAlertMessage({
        type: TOAST_TYPE.ERROR,
        msg: "Error while sending text message",
      });
    },
  });

  const { mutate: addImageMessage } = useAddMultiMessageQuery({
    url: ADD_IMAGE_MESSAGE,
  });

  const handleSendMessage = () => {
    if (message) {
      addTextMessage(message);
      setMessage("");
    }
  };

  const handleControllMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onEnterForInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (message) {
        addTextMessage(message);

        setMessage("");
      }
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => (prevMessage += emojiData.emoji));
  };

  const handleEmojiModal = () => {
    setShowEmojiPicker(true);
  };

  useUnmountIfClickedOutside({
    ref: $emojiPicker,
    callback: () => {
      setShowEmojiPicker(false);
    },
  });

  const handlePhotoPicker = () => {
    $photoPicker.current?.click();
  };

  const handleOnChangePhotoInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const reader = new FileReader();
      const file = e.target.files;

      if (file[0]) {
        reader.readAsDataURL(file[0]);

        const image = (await resizeFile({
          file: file[0],
          size: 300,
          outPut: "file",
        })) as File;

        const formData = new FormData();

        formData.append("image", image);

        addImageMessage(formData);
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
            onClick={handleEmojiModal}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-24 left-16 z-40" ref={$emojiPicker}>
              <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
            </div>
          )}
          <BsImageFill
            className="cursor-pointer text-[20px] text-panel-header-icon"
            title="Attach"
            onClick={handlePhotoPicker}
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
        </div>
      </>
      {/* {showAudioRecorder && <CaptureAudio hide={setShowAudioRecorder} />} */}
      <PhotoPicker
        ref={$photoPicker}
        onChangeSetImage={handleOnChangePhotoInput}
      />
    </div>
  );
};

export default MessageBar;
