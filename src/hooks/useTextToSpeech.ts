import { useEffect, useRef, useState } from "react";

export function useTextToSpeech(text: string) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
  //   null,
  // );
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    // setUtterance(u);
    utterance.current = u;

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlaySpeak = () => {
    setIsSpeaking(true);
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }
    if (utterance.current) {
      synth.speak(utterance.current);

      setIsPaused(false);
    }
  };

  const handlePauseSpeak = () => {
    setIsSpeaking(false);
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStopSpeak = () => {
    setIsSpeaking(false);
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return {
    handlePauseSpeak,
    handlePlaySpeak,
    handleStopSpeak,
    isPaused,
    isSpeaking,
  };
}
