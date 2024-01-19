"use client";
import { useDisclosure } from "@mantine/hooks";
import { Button, Slider, ColorPicker, Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import { useSound } from "use-sound";

export default function Home() {
  const [interval, setIntervalState] = useState(0.5);
  const [play] = useSound("/beep-07a.mp3", { volume: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [colour, setColour] = useState("rgba(47, 79, 79, 1)");
  const [openedColour, { open, close }] = useDisclosure(false);

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
      <div className="container" style={{ backgroundColor: colour }}>
        <div
          className="testSoundButtonContainer"
          style={{ right: "auto", left: "0" }}
        >
          <Button onClick={open}>Background colour</Button>
          <Modal
            opened={openedColour}
            onClose={close}
            centered
            withCloseButton={false}
            style={{
              textAlign: "center",
            }}
            size="auto"
          >
            <h3 style={{ marginTop: "5px" }}>Choose a background colour</h3>
            <ColorPicker
              format="rgba"
              value={colour}
              onChange={setColour}
              swatches={[
                "#2e2e2e",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
              size="xl"
            />

            <Button
              onClick={() => setColour("rgba(47, 79, 79, 1)")}
              style={{ marginTop: "5px" }}
            >
              Reset to default
            </Button>
          </Modal>
        </div>
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
