"use client";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { Button, Slider, ColorPicker, ColorInput, Drawer } from "@mantine/core";
import { useState } from "react";
import { useSound } from "use-sound";
import {
  IconChevronRight,
  IconChevronLeft,
  IconVolume,
} from "@tabler/icons-react";
import timeStringFormatter from "@/lib/timeFormatter/timeFormatter";
import isColourBright from "@/lib/isColourBright/isColourBright";

export default function Home() {
  const [volume, setVolume] = useState(0.1);
  const [interval, setIntervalState] = useState(0.5);
  const [play] = useSound("/beep-07a.mp3", { volume: volume });
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [opened, { open, close }] = useDisclosure(false);

  const [colour, setColour] = useLocalStorage({
    key: "colour",
    defaultValue: "#2F4F4F",
  });

  const [contrastColour, setContrastColour] = useLocalStorage({
    key: "contrastColour",
    defaultValue: isColourBright(colour) ? "black" : "white",
  });

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
        <div className="settingsContainer">
          <IconChevronRight
            onClick={open}
            size={28}
            style={{ color: contrastColour }}
          />
        </div>

        <Drawer
          opened={opened}
          onClose={close}
          withOverlay={false}
          title="Settings"
          closeButtonProps={{
            icon: <IconChevronLeft color={contrastColour} />,
          }}
          styles={{
            content: { backgroundColor: colour },
            header: {
              backgroundColor: colour,
              color: contrastColour,
            },
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              minHeight: "92dvh",
            }}
          >
            <h3
              style={{
                marginTop: "5px",
                color: contrastColour,
              }}
            >
              Choose a background colour
            </h3>

            <ColorPicker
              format="hex"
              value={colour}
              onChange={(newColour) => {
                setColour(newColour);
                setContrastColour(
                  isColourBright(newColour) ? "black" : "white"
                );
              }}
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
            <p style={{ color: contrastColour }}>
              Or put in your own hex value below
            </p>

            <ColorInput
              value={colour}
              withPicker={false}
              withEyeDropper={false}
              placeholder="Hex colour value"
              onChange={setColour}
              leftSection={false}
            />

            <Button
              onClick={() => {
                setColour("#2F4F4F");
                setContrastColour(
                  isColourBright("#2F4F4F") ? "black" : "white"
                );
              }}
              style={{ marginTop: "15px" }}
            >
              Reset colour
            </Button>

            <h4 style={{ color: contrastColour }}> Volume: {volume * 100}%</h4>

            <Slider
              value={volume}
              min={0.1}
              max={1}
              step={0.1}
              size="lg"
              onChange={(e) => setVolume(e)}
              thumbChildren={<IconVolume size="2rem" />}
              thumbSize={26}
              label={null}
              styles={{
                markLabel: {
                  color: contrastColour,
                },
                thumb: { borderWidth: 2, padding: 3 },
              }}
              onChangeEnd={handlePlaySound}
            />
            <div
              style={{
                marginTop: "auto",
                bottom: "0",
                color: contrastColour,
                paddingBottom: "5px",
              }}
            >
              Favicon by{" "}
              <a target="_blank" href="https://icons8.com">
                Icons8
              </a>
            </div>
          </div>
        </Drawer>

        <h1 style={{ color: contrastColour }}>
          Reminder to sit straight and drink water
        </h1>
        <h2 style={{ color: contrastColour }}>Set your reminder interval</h2>

        <div className={"sliderContainer"}>
          <Slider
            min={0.5}
            max={6}
            step={0.5}
            size="lg"
            marks={marks}
            onChange={(e) => setIntervalState(e)}
            styles={{
              markLabel: { color: contrastColour },
            }}
          />
        </div>

        <div className="box">
          <h2 style={{ color: contrastColour }}>
            Current interval: {timeStringFormatter(interval)}
          </h2>
          <Button onClick={togglePlay} color={isPlaying ? "red" : "blue"}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>
      </div>
    </>
  );
}
