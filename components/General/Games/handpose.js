import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

export const gesture1 = new GestureDescription("gesture1");
export const gesture0 = new GestureDescription("gesture0");
export const gesture3 = new GestureDescription("gesture3");
export const gesture4 = new GestureDescription("gesture4");
export const gesture5 = new GestureDescription("gesture5");

gesture1.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
gesture1.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Gesture 0
for (let finger of [
  Finger.Index,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
  Finger.Thumb,
]) {
  gesture0.addCurl(finger, FingerCurl.FullCurl, 1.0);
  gesture0.addDirection(finger, FingerDirection.VerticalUp, 1);
  gesture0.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
  gesture0.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
}

//Gesture 1
for (let finger of [Finger.Index]) {
  gesture1.addCurl(finger, FingerCurl.NoCurl, 1.0);
  gesture1.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Thumb]) {
  gesture1.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

//Gesture 3
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  gesture3.addCurl(finger, FingerCurl.NoCurl, 1.0);
  gesture3.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  gesture3.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
  gesture3.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
}

for (let finger of [Finger.Pinky, Finger.Thumb]) {
  gesture3.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

//Gesture 4
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  gesture4.addCurl(finger, FingerCurl.NoCurl, 1.0);
  gesture4.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  gesture4.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
  gesture4.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
}

for (let finger of [Finger.Thumb]) {
  gesture4.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

//Gesture 5
for (let finger of [
  Finger.Index,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
  Finger.Thumb,
]) {
  gesture5.addCurl(finger, FingerCurl.NoCurl, 1.0);
  gesture5.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  gesture5.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
  gesture5.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
}

gesture5.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
gesture5.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
