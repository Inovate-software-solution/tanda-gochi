"use client";

// Install dependencies
// Import dependencies
// Set up webcam and canvas refs
// Define references to the webcam and canvas elements in the JSX
// Load handpose
// Detect function
// Drawing ultil
// Draw functions



import Webcam from "react-webcam"
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import React, {useRef, useState} from "react";
//import {drawhand} from "./utilities"

import * as fp from "fingerpose"
import victory from "./images/victory.svg"
import thumbsup from "./images/thumbsup.png"

export default function InteractiveGames() {
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const runHandpose = async () => {
        const net = await handpose.load()
        console.log("Handpose model loaded.")
        //  Loop and detect hands
        setInterval(() => {
            detect(net)
        }, 100)
    }

    const detect = async (net) => {

        // Check data is available
        if (
            
        )


    return(<>123</>)
}