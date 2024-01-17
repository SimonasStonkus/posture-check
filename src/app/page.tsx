"use client";
import { Button, Slider } from "@mantine/core";
import { useState, useEffect } from "react";
import { useSound } from "use-sound";

export default function Home() {
  const [interval, setIntervalState] = useState(0.5);
  const [play] = useSound("/beep-07a.mp3", { volume: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  const handlePlaySound = () => {
    play();
    setTimeout(play, 300);
  };

  const togglePlay = () => {
    if (isPlaying) {
      // If the sound is currently playing, stop it
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
      setIsPlaying(false);
    } else {
      // If the sound is currently paused, start playing it
      const id = window.setInterval(
        handlePlaySound,
        interval * 60 * 60 * 1000 // Convert interval from hours to milliseconds
      ) as unknown as number;
      setIntervalId(id);
      setIsPlaying(true);
    }
  };

  const timeStringFormatter = (value: number) => {
    const minutes: number = value % 1;
    const hours: number = value - minutes;
    let formattedTime: string = "";

    if (minutes === 0.5 && hours === 0) {
      return "30 minutes";
    }

    formattedTime += `${hours} hour`;
    if (hours !== 1) {
      formattedTime += "s";
    }
    if (minutes !== 0) {
      formattedTime += ` and 30 minutes`;
    }

    return formattedTime;
  };

  const marks = [
    { value: 0.5, label: "0.5 hr" },
    { value: 1, label: "1 hr" },
    { value: 2, label: "2 hrs" },
    { value: 3, label: "3 hrs" },
    { value: 4, label: "4 hrs" },
    { value: 5, label: "5 hrs" },
    { value: 6, label: "6 hrs" },
  ];

  return (
    <>
      <div className="container">
        <h1>Reminder to sit straight and drink water</h1>
        <h2>Set your reminder interval</h2>
        <div className={"sliderContainer"}>
          <Slider
            min={0.5}
            max={6}
            step={0.5}
            size="lg"
            marks={marks}
            onChange={(e) => setIntervalState(e)}
          />
        </div>
        <div className="box">
          <h2>Current interval: {timeStringFormatter(interval)}</h2>
          <Button onClick={togglePlay} color={isPlaying ? "red" : "blue"}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <div className="testSoundButtonContainer">
            <Button onClick={handlePlaySound}>Test sound</Button>
          </div>
        </div>
      </div>
    </>
  );
}
