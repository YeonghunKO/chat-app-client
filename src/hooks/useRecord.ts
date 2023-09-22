import { useEffect, useRef, useState } from "react";
import { useInterval } from "./useInterval";
import { useThrottle } from "./useThrottle";

import WaveSurfer from "wavesurfer.js";

interface IUseRecord {
  waveForm: WaveSurfer | undefined;
}

export const useRecord = ({ waveForm }: IUseRecord) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);

  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

  const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement>();
  const [renderedAudio, setRenderedAudio] = useState<File>();

  const audioChunks: any[] = [];

  const mediaRecorderRef = useRef<MediaRecorder>();

  const [throttle] = useThrottle({
    callback: (currentTime: number) => {
      setCurrentPlaybackTime(currentTime);
    },
  });

  useInterval({
    callback: () => {
      setRecordingDuration((prevDuration) => {
        return prevDuration + 1;
      });
    },
    delay: 1000,
    isStop: !isRecording, // stop when not recording
  });

  const handlePlayRecordedAudio = () => {
    if (recordedAudio && waveForm) {
      waveForm.play();
      setisPlaying(true);
    }
  };

  const handlePauseRecordedAudio = () => {
    if (recordedAudio && waveForm) {
      waveForm.playPause();
      setisPlaying(false);
    }
  };

  const handleStartRecording = () => {
    if (waveForm) {
      waveForm.stop();
    }
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);

    setIsRecording(true);

    // allowing access to user's hardware media devices. eg.camera,microphone
    navigator.mediaDevices
      // get user's permission to provide stream through prompt method
      .getUserMedia({ audio: true })
      .then((stream) => {
        // it literally means record media
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing microphones:", error);
      });
  };

  //
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording && waveForm) {
      mediaRecorderRef.current.stop();

      setIsRecording(false);
      waveForm.stop();
    }
  };

  // after init waveSurfer, start recording
  useEffect(() => {
    if (waveForm) {
      handleStartRecording();
    }
  }, [waveForm]);

  // register waveForm event
  useEffect(() => {
    if (!waveForm) {
      return;
    }

    setCurrentPlaybackTime(0);
    setisPlaying(false);

    waveForm.on("play", () => {
      setisPlaying(true);
    });
    waveForm.on("pause", () => {
      setisPlaying(false);
    });
    waveForm.on("finish", () => {
      waveForm.stop();
    });
    waveForm.on("audioprocess", (currentTime: any) => {
      throttle(currentTime);
    });

    return () => {
      waveForm.unAll();
    };
  }, [waveForm]);

  // accumulate audio chunks
  useEffect(() => {
    const pushChunk = (event: any) => {
      audioChunks.push(event.data);
    };

    mediaRecorderRef.current?.addEventListener("dataavailable", pushChunk);

    return () =>
      mediaRecorderRef.current?.removeEventListener("dataavailable", pushChunk);
  }, [mediaRecorderRef.current, audioChunks]);

  // convert chunks into audio file everytime media audio recorder stops
  useEffect(() => {
    const convertChunkIntoAudioFile = () => {
      // The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data,
      const audioBlobForFile = new Blob(audioChunks, { type: "audio/mp3" });
      const audioUrlBlobForRecorded = new Blob(audioChunks, {
        type: "audio/ogg; codecs=opus",
      });

      const audioFile = new File([audioBlobForFile], "recording.mp3");

      // The URL.createObjectURL() static method creates a string containing a URL representing the object given in the parameter.
      // A File, Blob, or MediaSource object to create an object URL for.
      // ex> blob:http://localhost:3000/685dbc37-c379-4c86-8ddd-06e30ee50f2b
      const audioUrl = URL.createObjectURL(audioUrlBlobForRecorded);

      const audio = new Audio(audioUrl);

      setRecordedAudio(audio);
      setRenderedAudio(audioFile);

      waveForm?.load(audioUrl);
    };

    mediaRecorderRef.current?.addEventListener(
      "stop",
      convertChunkIntoAudioFile,
    );

    return () =>
      mediaRecorderRef.current?.removeEventListener(
        "stop",
        convertChunkIntoAudioFile,
      );
  }, [mediaRecorderRef.current, audioChunks]);

  return [
    {
      isRecording,
      recordingDuration,
      currentPlaybackTime,
      recordedAudio,
      renderedAudio,
      isPlaying,
    },
    {
      handlePlayRecordedAudio,
      handlePauseRecordedAudio,
      handleStartRecording,
      handleStopRecording,
    },
  ] as const;
};
