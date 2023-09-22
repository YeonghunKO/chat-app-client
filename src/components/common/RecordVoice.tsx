// settings
import React, { Dispatch, SetStateAction, useRef } from "react";

// components
import { FaMicrophone, FaPauseCircle, FaPlay, FaStop } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

import { MdSend } from "react-icons/md";

// business
import { formatTime } from "@/utils/calculateTime";
import { useRecord } from "@/hooks/useRecord";
import { useWaveSurfer } from "@/hooks/useWaveSurfer";
import { useAddMultiMessageQuery } from "@/hooks/useQueryAccount";
import { ADD_AUDIO_MESSAGE } from "@/constant/api";
import { useUiState } from "@/store";
import { TOAST_TYPE } from "@/constant/type";

interface IRecordVoice {
  setShowRecorder: Dispatch<SetStateAction<boolean>>;
}

const RecordVoice = ({ setShowRecorder }: IRecordVoice) => {
  const $waveformRef = useRef<HTMLDivElement>(null);
  const updateToast = useUiState((set) => set.updateToastInfo);

  const { mutate: addAudioMessage } = useAddMultiMessageQuery({
    url: ADD_AUDIO_MESSAGE,
    onError: () => {
      updateToast({
        type: TOAST_TYPE.ERROR,
        msg: "error while sending audio message",
      });
    },
  });

  const [waveForm] = useWaveSurfer({
    container: $waveformRef,
  });

  const [
    {
      currentPlaybackTime,
      isPlaying,
      isRecording,
      recordedAudio,
      recordingDuration,
      renderedAudio,
    },
    {
      handlePauseRecordedAudio,
      handlePlayRecordedAudio,
      handleStartRecording,
      handleStopRecording,
    },
  ] = useRecord({
    waveForm,
  });

  const handleCloseRecorder = () => {
    setShowRecorder(false);
  };

  const sendRecording = () => {
    if (!renderedAudio) {
      return;
    }
    const formData = new FormData();
    formData.append("audio", renderedAudio);
    addAudioMessage(formData);
  };

  return (
    <div className="flex w-full items-center justify-end gap-[10px] text-2xl">
      <div className="contents items-center pt-1">
        <GiCancel
          className="cursor-pointer text-panel-header-icon"
          onClick={handleCloseRecorder}
        />
      </div>
      <div className="flex w-[50%] items-center justify-center gap-3 rounded-full bg-search-input-container-background px-3 py-2 text-lg text-white drop-shadow-lg">
        {isRecording ? (
          <div className="animate-blink w-60 text-center text-red-500">
            Recording <span>({recordingDuration}s)</span>
          </div>
        ) : (
          <div className="">
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay
                    className="cursor-pointer"
                    onClick={handlePlayRecordedAudio}
                  />
                ) : (
                  <FaPauseCircle
                    className="cursor-pointer"
                    onClick={handlePauseRecordedAudio}
                  />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-full" ref={$waveformRef} hidden={isRecording} />
        {recordedAudio && !isRecording && (
          <span>{formatTime(currentPlaybackTime)}</span>
        )}
      </div>

      <div className="flex gap-[10px]">
        <div>
          {!isRecording ? (
            <FaMicrophone
              className="cursor-pointer text-red-500"
              onClick={handleStartRecording}
            />
          ) : (
            <FaStop
              className="cursor-pointer text-red-500"
              onClick={handleStopRecording}
            />
          )}
        </div>
        <div>
          <MdSend
            className="mr-4 cursor-pointer text-panel-header-icon "
            title="Send"
            onClick={sendRecording}
          />
        </div>
      </div>
    </div>
  );
};

export default RecordVoice;
