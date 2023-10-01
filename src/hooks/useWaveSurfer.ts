import { RefObject, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface IUseWaveSurfer {
  container: RefObject<HTMLDivElement>;
}

export const useWaveSurfer = ({ container }: IUseWaveSurfer) => {
  const [waveform, setWaveform] = useState<WaveSurfer>();

  // init waveSurfer
  useEffect(() => {
    if (container.current) {
      const waveSurfer = WaveSurfer.create({
        container: container.current as HTMLDivElement,
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
        hideScrollbar: true,
      });

      setWaveform(waveSurfer);

      return () => {
        waveSurfer.destroy();
      };
    }
  }, []);

  return [waveform];
};
