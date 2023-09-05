import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { FaMicrophone } from "react-icons/fa";
import { MdSend } from "react-icons/md";

const MessageBar = () => {
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
          <input
            type="text"
            placeholder="Type a message"
            className="h-10 w-full rounded-lg bg-input-background py-4 pl-5 pr-5 text-sm text-white focus:outline-none"
            //   value={message}
            //   onChange={(e) => setMessage(e.target.value)}
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
