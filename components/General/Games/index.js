"use client";
import React, { useRef, useState, useEffect } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { gesture0, gesture1, gesture3, gesture4, gesture5 } from "./handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";

import * as fp from "fingerpose";

function Games(props) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  ///////// NEW STUFF ADDED STATE HOOK
  const [emoji, setEmoji] = useState(null);
  const [game, setGame] = useState(null);
  const [computerRespond, setComputerRespond] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  ///////// NEW STUFF ADDED STATE HOOK

  const playerResult = {
    gesture0: "Rock",
    gesture5: "Paper",
    victory: "Scissros",
  };

  ///////// GAMES FUNCTIONS
  const getRandomInt = (num) => {
    return Math.floor(Math.random() * num);
  };

  ///////// GAMES FUNCTIONS

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          gesture0,
          gesture1,
          gesture3,
          gesture4,
          gesture5,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const topGesture = gesture.gestures.reduce((a, b) =>
            a.score > b.score ? a : b
          );
          setEmoji(topGesture.name);
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      //drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);

  useEffect(() => {
    console.log("Handpose Changed! Current handpose is " + emoji);
    if (emoji == "thumbs_up") {
      setGame("rps");
    }
  }, [emoji]);

  const getEmoji = () => {
    return emoji;
  };

  useEffect(() => {
    if (game != null) {
      switch (game) {
        case "rps":
          setAnnouncement("Game started!");
          setTimeout(() => {
            setComputerRespond(null);
            console.log(emoji);
            setGame("rps-end");
          }, 4000);
          break;
        case "rps-end":
          const result = getRandomInt(3);
          const gameEmoji = getEmoji();

          const computerResult = {
            0: "Rock",
            1: "Paper",
            2: "Scissors",
          };
          //0 = rock, 1 = paper, 2 = scissors
          if (
            (gameEmoji == "gesture0" && result == 0) ||
            (gameEmoji == "gesture5" && result == 1) ||
            (gameEmoji == "victory" && result == 2)
          ) {
            setAnnouncement("Draw!");
            props.setGameResult("win");
          } else if (
            (gameEmoji == "gesture0" && result == 2) ||
            (gameEmoji == "gesture5" && result == 0) ||
            (gameEmoji == "victory" && result == 1)
          ) {
            setAnnouncement("You win!");
            props.setGameResult("win");
          } else {
            setAnnouncement("You lose!");
            props.setGameResult("win");
          }
          console.log(
            "Your choice: " +
              playerResult[gameEmoji] +
              " Computer choice: " +
              computerResult[result]
          );
          setComputerRespond(computerResult[result]);
          setGame(null);
          console.log("Game ended");
          break;
        default:
          console.log("New game! Current game is " + game);
          setTimeout(() => {
            setGame(null);
            console.log("Game ended");
          }, 5000);
          break;
      }
    }
  }, [game]);

  return (
    <div className="sm:w-[400px] sm:h-[650px] bg-red rounded-md">
      <div className="h-1/4 bg-red rounded-md"/>
      <div className="h-3/4 bg-red rounded-md">
      <Webcam
        ref={webcamRef}
      />
      <div>
        {emoji == null ? (
          <div>Null</div>
        ) : (
          <div className="text-black font-bold text-[24px]" >
            Player Respond: {playerResult[emoji] ? playerResult[emoji] : emoji}
          </div>
        )}
        <div className="text-black font-bold text-[24px]">Computer Respond: {computerRespond}</div>
        <div className="text-black font-bold text-[24px]">Game Result: {announcement}</div>
      </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />


    </div>
  );
}

export default Games;
