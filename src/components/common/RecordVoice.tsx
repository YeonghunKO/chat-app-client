// settings
import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import WaveSurfer from "wavesurfer.js";

// components
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";

// business
import { formatTime } from "@/utils/calculateTime";

interface IRecordVoice {
  setShowRecorder: Dispatch<SetStateAction<boolean>>;
}

const RecordVoice = ({ setShowRecorder }: IRecordVoice) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [waveform, setWaveform] = useState<WaveSurfer>();
  const [recordedAudio, setRecordedAudio] = useState(null);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const [renderedAudio, setRenderedAudio] = useState(null);
  const [isPlaying, setisPlaying] = useState(false);

  console.log("waveform", waveform);

  // init waveSurfer
  useEffect(() => {
    console.log("waveformRef.current", waveformRef.current);

    if (waveformRef.current) {
      const waveSurfer = WaveSurfer.create({
        container: waveformRef.current as HTMLDivElement,
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });

      setWaveform(waveSurfer);

      waveSurfer.on("finish", () => {
        setisPlaying(false);
      });

      return () => {
        waveSurfer.destroy();
      };
    }
  }, []);

  useEffect(() => {}, []);
  useEffect(() => {}, []);

  // after init waveSurfer, start recording
  useEffect(() => {
    if (waveform) {
      handleStartRecording();
    }
  }, [waveform]);

  const handleCloseRecorder = () => {
    setShowRecorder(false);
  };
  const handlePlayRecordedAudio = () => {
    setShowRecorder(false);
  };
  const handlePauseRecordingAudio = () => {
    setShowRecorder(false);
  };

  const handleStartRecording = () => {};
  const handleStopRecording = () => {};
  const sendRecording = () => {};

  return (
    <div className="flex w-full items-center justify-end gap-[10px] text-2xl">
      <div className="pt-1">
        <FaTrash
          className="cursor-pointer text-panel-header-icon"
          onClick={handleCloseRecorder}
        />
      </div>
      <div className="flex w-[50%] items-center justify-center gap-3 rounded-full bg-search-input-container-background py-2 text-lg text-white drop-shadow-lg">
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
                  <FaStop
                    className="cursor-pointer"
                    onClick={handlePauseRecordingAudio}
                  />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-full" ref={waveformRef} hidden={isRecording} />
        {recordedAudio && isPlaying && (
          <span>{formatTime(currentPlaybackTime)}</span>
        )}
        {recordedAudio && !isPlaying && (
          <span>{formatTime(totalDuration)}</span>
        )}
        <audio ref={audioRef} hidden />
      </div>

      <div className="flex gap-[10px]">
        <div>
          {!isRecording ? (
            <FaMicrophone
              className="cursor-pointer text-red-500"
              onClick={handleStartRecording}
            />
          ) : (
            <FaPauseCircle
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

//   // update current playback time
//   useEffect(() => {
//     if (recordedAudio) {
//       const updatePlaybackTime = () => {
//         setCurrentPlaybackTime(recordedAudio.currentTime);
//       };
//       recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
//       return () => {
//         recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
//       };
//     }
//   }, [recordedAudio]);

//   // update recording duration when recording
//   useEffect(() => {
//     let interval;
//     if (isRecording) {
//       interval = setInterval(() => {
//         setRecordingDuration((prevDuration) => {
//           setTotalDuration(prevDuration + 1);
//           return prevDuration + 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [isRecording]);

//   // init waveSurfer
//   useEffect(() => {
//     const wavesurfer = WaveSurfer.create({
//       container: waveformRef.current,
//       waveColor: "#ccc",
//       progressColor: "#4a9eff",
//       cursorColor: "#7ae3c3",
//       barWidth: 2,
//       height: 30,
//       responsive: true,
//     });
//     setWaveform(wavesurfer);

//     wavesurfer.on("finish", () => {
//       setisPlaying(false);
//     });

//     return () => {
//       wavesurfer.destroy();
//     };
//   }, []);

//   // after init waveSurfer, start recording
//   useEffect(() => {
//     if (waveform) {
//       handleStartRecording();
//     }
//   }, [waveform]);

//   const handleStartRecording = () => {
//     setRecordingDuration(0);
//     setCurrentPlaybackTime(0);
//     setTotalDuration(0);

//     setIsRecording(true);

//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         const mediaRecorder = new MediaRecorder(stream);
//         mediaRecorderRef.current = mediaRecorder;
//         audioRef.current.srcObject = stream;

//         const chunks = [];
//         mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
//         mediaRecorder.onstop = () => {
//           const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//           const audioURL = URL.createObjectURL(blob);
//           const audio = new Audio(audioURL);
//           setRecordedAudio(audio);

//           waveform.load(audioURL);
//         };

//         mediaRecorder.start();
//       })
//       .catch((error) => {
//         console.error("Error accessing microphone:", error);
//       });
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//       waveform.stop();

//       const audioChunks = [];

//       // 이벤트 등록은 useEffect로 해야하지 않나?? 한 이벤트당 effect한개씩
//       mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
//         audioChunks.push(event.data);
//       });

//       mediaRecorderRef.current.addEventListener("stop", () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
//         const audioFile = new File([audioBlob], "recording.mp3");
//         setRenderedAudio(audioFile);
//       });
//     }
//   };

//   const handlePlayRecordedAudio = () => {
//     if (recordedAudio) {
//       waveform.stop();
//       waveform.play();
//       recordedAudio.play();
//       setisPlaying(true);
//     }
//   };

//   const handlePauseRecordingAudio = () => {
//     waveform.stop();
//     recordedAudio.pause();
//     setisPlaying(false);
//   };

//   // send this to utils folder. fun fact : generated by chatGPT

//   const sendRecording = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("audio", renderedAudio);
//       const response = await axios.post(ADD_AUDIO_MESSAGE_ROUTE, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         params: {
//           from: userInfo.id,
//           to: currentChatUser.id,
//         },
//       });
//       if (response.status === 201) {
//         socket.current.emit("send-msg", {
//           to: currentChatUser.id,
//           from: userInfo.id,
//           message: response.data.message,
//         });
//         dispatch({
//           type: reducerCases.ADD_MESSAGE,
//           newMessage: {
//             ...response.data.message,
//           },
//           fromSelf: true,
//         });
//         hide();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
