// settings
import React, { useRef, useState } from "react";

// components
import { BsEmojiSmile } from "react-icons/bs";
import { BsImageFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Input from "../common/Input";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import PhotoPicker from "../common/PhotoPicker";
import { IoIosClose } from "react-icons/io";

// buisiness
import {
  useAddMultiMessageQuery,
  useAddTextMessageQuery,
} from "@/hooks/useQueryAccount";
import { useUiState } from "@/store";
import { TOAST_TYPE } from "@/constant/type";
import { ADD_IMAGE_MESSAGE } from "@/constant/api";
import { resizeFile } from "@/utils/resizeImg";
import dynamic from "next/dynamic";

const RecordVoice = dynamic(() => import("../common/RecordVoice"), {
  ssr: false,
});

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const setAlertMessage = useUiState((set) => set.updateToastInfo);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

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
    onError: () => {
      setAlertMessage({
        type: TOAST_TYPE.ERROR,
        msg: "Error while sending image message",
      });
    },
  });

  const handleSendMessage = () => {
    if (message) {
      addTextMessage(message);
      setMessage("");
    }
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

  const showEmojiModal = () => {
    setShowEmojiPicker(true);
  };

  const closeEmojiModal = () => {
    setShowEmojiPicker(false);
  };

  const handlePhotoPicker = () => {
    $photoPicker.current?.click();
  };

  const handleOnChangePhotoInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      if (e.target.files) {
        const reader = new FileReader();
        const file = e.target.files;

        if (file[0]) {
          reader.readAsDataURL(file[0]);

          const image = (await resizeFile({
            file: file[0],
            size: 500,
            outPut: "file",
          })) as File;

          const formData = new FormData();

          formData.append("image", image);

          addImageMessage(formData);
        }
      }
    } catch (error) {
      setAlertMessage({
        msg: "Only Image Files can be uploaded",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  const handleOpenAudioRecorder = () => {
    setShowAudioRecorder(true);
  };

  return (
    <div className="relative flex h-20 items-center gap-3 bg-panel-header-background  px-4">
      {!showAudioRecorder ? (
        <>
          <div className="flex gap-4">
            <BsEmojiSmile
              className="cursor-pointer text-[20px] text-panel-header-icon"
              title="Emoji"
              onClick={showEmojiModal}
            />
            {showEmojiPicker && (
              <div
                className="absolute bottom-[10dvh] left-[1dvw] z-40"
                ref={$emojiPicker}
              >
                <IoIosClose
                  onClick={closeEmojiModal}
                  className="absolute right-[0px] top-[0px] z-10 cursor-pointer text-[30px] text-white"
                />
                <EmojiPicker
                  skinTonesDisabled
                  onEmojiClick={handleEmojiClick}
                  theme={Theme.DARK}
                  height={500}
                  width={300}
                />
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
            />
          </div>
          <div className="flex items-center gap-3">
            <FaMicrophone
              className="cursor-pointer text-[20px] text-panel-header-icon"
              title="Record"
              onClick={handleOpenAudioRecorder}
            />
            <MdSend
              className="cursor-pointer text-[20px] text-panel-header-icon"
              title="Send"
              data-testid="send-message"
              onClick={handleSendMessage}
            />
          </div>
        </>
      ) : null}
      {showAudioRecorder && (
        <RecordVoice setShowRecorder={setShowAudioRecorder} />
      )}
      <PhotoPicker
        ref={$photoPicker}
        onChangeSetImage={handleOnChangePhotoInput}
      />
    </div>
  );
};

export default MessageBar;
