"use client";

import { Progress } from "@/components/ui/progress";
import useModalStore from "@/hooks/useModalStore";
import { useEffect, useRef, useState, Suspense } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { LiveAudioVisualizer } from "react-audio-visualize";

type Props = {
  questions: {
    category: string;
    id: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    question: string;
    tags: string[];
    type: string;
    difficulty: string;
    regions: [];
    isNiche: boolean;
  }[];
  limit: number;
  category: string;
};



const Questions = ({ questions, limit }: Props) => {
  const recorderControls = useAudioRecorder();
  const [audioUrl, setAudioUrl] = useState('');
  const [curr, setCurr] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const { onOpen } = useModalStore();
  const [isPlaying, setIsPlaying] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const initialTimeSeconds = 2 * 60;
  const [timeRemaining, setTimeRemaining] = useState(initialTimeSeconds);
  const [displayTime, setDisplayTime] = useState(formatTime(timeRemaining));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsRunning(false);
            
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    setDisplayTime(formatTime(timeRemaining));
  }, [timeRemaining]);

  const audioSrc = '/audio.mp3';

  const play = (src: string) => {
    const audio = audioRef.current;

    if (audio) {
      audio.src = src;
      setIsPlaying(1);

      audio.addEventListener('ended', () => {
        setIsPlaying(3);
        recorderControls.startRecording();

        setIsRunning(false);
        setIsRunning(true);
        setTimeRemaining(initialTimeSeconds);
      }, false);

      audio.play();
    }
  };


  const handleNext = () => {
    recorderControls.stopRecording();
    setIsRunning(false);
    setTimeRemaining(initialTimeSeconds);
    setCurr((curr) => curr + 1);
    play(audioSrc)
  };


  const handleQuit = () => {
    onOpen("quitQuiz");
  };

  const handleShowResult = () => {
    recorderControls.stopRecording();
    setIsRunning(false);
    setTimeRemaining(initialTimeSeconds);
    onOpen("showResults");
  };

  useEffect(() => {
    setProgressValue((100 / limit) * (curr + 1));
  }, [curr]);

  useEffect(() => {
    if (!recorderControls.recordingBlob) return;
    console.log(recorderControls.recordingBlob);

  }, [recorderControls.recordingBlob])

  return (
    <div className="wrapper">
      <div className="bg-white p-4 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-md">
        <h1 className="heading">AI Mock Interview</h1>
        <Separator className="mb-3" />
        <Progress value={progressValue} />
        <div className="flex justify-between py-5 px-2 font-bold text-md">
          <p>Question: {curr + 1}</p>
          <p>Countdown: { displayTime }</p>
        </div>
        <div>
          <audio ref={audioRef} src={audioSrc} />
        </div>
        <div className="flex flex-col min-h-[70vh] py-10 px-3 md:px-5 gap-4 w-full">
          {1 > 0 && (
            <>
              <h2 className="text-2xl text-center font-medium">
                Please 
              {
                isPlaying==0 && (
                  <span> start to the question </span>
                )
              }
              {
                isPlaying==1 && (
                  <span> listen to the audio </span>
                )
              }
              {
                isPlaying==3 && (
                  <span>  record your answer </span>
                )
              }.
              </h2>
              <div className="hidden">
                <AudioRecorder
                  recorderControls={recorderControls}
                />
              </div>
              {recorderControls.mediaRecorder && (
                <Suspense>
                  <LiveAudioVisualizer
                    mediaRecorder={recorderControls.mediaRecorder}
                    barWidth={2}
                    gap={2}
                    width={550}
                    height={30}
                    fftSize={1024}
                    maxDecibels={-10}
                    minDecibels={-120}
                    smoothingTimeConstant={0.8}
                  />
                </Suspense>
              )}

              <Separator />
              {
                isPlaying==0 && (
                  <div className="flex mt-5 md:justify-center md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
                    <Button onClick={()=>play(audioSrc)}>Start</Button>
                  </div>
                )
              }
              {
                isPlaying!=0 && (
                  <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
                    <Button
                    disabled={isPlaying==1}
                      onClick={() => questions.length === curr + 1
                        ? handleShowResult()
                        : handleNext()}
                    >
                      {questions.length - 1 != curr
                        ? "Next Question"
                        : "Submit Answer"}
                    </Button><Button variant={"destructive"} onClick={handleQuit}>
                      Quit Quiz
                    </Button>
                  </div>
                )
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
