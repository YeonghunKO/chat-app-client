// settings
import { useEffect, useRef, useState } from "react";

// business
import { useLocalStorage } from "@/store";
import type { ILocalStorage, IMessage } from "@/type";
import { formatAMPM, formatTime } from "@/utils/calculateTime";
import { useWaveSurfer } from "@/hooks/useWaveSurfer";
import { useThrottle } from "@/hooks/useThrottle";

// components
import { FaPauseCircle, FaPlay } from "react-icons/fa";
import Status from "./Status";
import Loading from "../common/Loading";
import { useStore } from "@/hooks/useStore";

const AudioMessage = ({ message }: { message: IMessage }) => {
  const currentChatUser = useStore(
    useLocalStorage,
    (state: ILocalStorage) => state.currentChatUser,
  );

  const $waveContainer = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);

  const [waveForm] = useWaveSurfer({ container: $waveContainer });

  const [throttle] = useThrottle({
    callback: (currentTime) => {
      setCurrentPlayTime(currentTime);
    },
  });

  const handlePlayAudio = () => {
    setIsPlaying(true);
    waveForm?.playPause();
  };

  const handlePauseAudio = () => {
    setIsPlaying(false);
    waveForm?.playPause();
  };

  useEffect(() => {
    if (!waveForm) {
      return;
    }
    try {
      const audioUrl = new Audio(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${message.message}`,
      );
      waveForm.load(audioUrl);
    } catch (error) {}
  }, [waveForm]);

  useEffect(() => {
    if (!waveForm) {
      return;
    }

    const setAudioTime = (currentTime: number) => {
      throttle(currentTime);
    };

    const resumeWave = () => {
      waveForm.stop();
      setIsPlaying(false);
    };

    waveForm.on("audioprocess", setAudioTime);
    waveForm.on("finish", resumeWave);

    return () => {
      waveForm.un("audioprocess", setAudioTime);
      waveForm.un("finish", resumeWave);
    };
  }, [waveForm]);

  return (
    <div
      id={`${message.id}`}
      key={message.id}
      className={`relative mb-[2px] flex h-[80px] w-[300px] flex-col justify-between overflow-hidden rounded-[10px]  ${
        currentChatUser?.id === message.senderId
          ? "mr-[25px] self-start bg-incoming-background"
          : "ml-[25px] self-end bg-outgoing-background"
      }`}
    >
      {message.message ? (
        <>
          <div className="flex w-full gap-[10px] px-[15px] pt-[20px]">
            <div className="flex items-center text-[30px]">
              {!isPlaying ? (
                <FaPlay className="cursor-pointer " onClick={handlePlayAudio} />
              ) : (
                <FaPauseCircle
                  className="cursor-pointer"
                  onClick={handlePauseAudio}
                />
              )}
            </div>
            <div className="w-full" ref={$waveContainer}></div>
          </div>

          <div className="flex justify-between px-[8px] pb-[3px] text-[9px] text-bubble-meta ">
            <div className="pl-[5px]">{formatTime(currentPlayTime)}</div>
            <div className="flex gap-[2px] self-end ">
              <span className="min-w-fit self-end text-[11px]">
                {formatAMPM(message.createdAt)}
              </span>
              {currentChatUser?.id !== message.senderId && (
                <div className="text-white">
                  <Status status={message.status} />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AudioMessage;
