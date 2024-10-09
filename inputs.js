// Define an array of local image paths
const images = [
  "/img/inputs/Arcade-Button-APunch.png", // images[0] - class A
  "/img/inputs/Arcade-Button-BKick.png",  // images[1] - class B
  "/img/inputs/Arcade-Button-CPunch.png", // images[2] - class C
  "/img/inputs/Arcade-Button-DKick.png",  // images[3] - class D
  "/img/inputs/Arcade-Button-Kick.png",   // images[4] - class Kick
  "/img/inputs/Arcade-Button-Punch.png",  // images[5] - class Punch
  "/img/inputs/Arcade-Stick-360.png",     // images[6] - class 360
  "/img/inputs/Arcade-Stick-CB.png",      // images[7] - class ChargeBack
  "/img/inputs/Arcade-Stick-CBF.png",     // images[8] - class ChargeBack_Forward
  "/img/inputs/Arcade-Stick-CDU.png",     // images[9] - class ChargeDown_Up
  "/img/inputs/Arcade-Stick-CDb.png",     // images[10] - class ChargeDownBack
  "/img/inputs/Arcade-Stick-Delta.png",   // images[11] - class Delta
  "/img/inputs/Arcade-Stick-Down.png",    // images[12] - class Down
  "/img/inputs/Arcade-Stick-Dp.png",      // images[13] - class DP
  "/img/inputs/Arcade-Stick-Hcb.png",     // images[14] - class HCB
  "/img/inputs/Arcade-Stick-Hcf.png",     // images[15] - class HCF
  "/img/inputs/Arcade-Stick-LR.png",      // images[16] - class Left_Right
  "/img/inputs/Arcade-Stick-Left.png",    // images[17] - class Left
  "/img/inputs/Arcade-Stick-Qcb.png",     // images[18] - class QCB
  "/img/inputs/Arcade-Stick-Qcf.png",     // images[19] - class QCF
  "/img/inputs/Arcade-Stick-Right.png",   // images[20] - class Right
  "/img/inputs/Arcade-Stick-UL.png",      // images[21] - class UpLeft
  "/img/inputs/Arcade-Stick-UR.png",      // images[22] - class UpRight
  "/img/inputs/Arcade-Stick-Up.png",      // images[23] - class Up
  "/img/inputs/Control-Modifier-Air.png", // images[24] - class Air
  "/img/inputs/Control-Modifier-Tap.png", // images[25] - class Tap
  "/img/inputs/Arcade-Stick-DL.png",      // images[26] - class DownLeft
  "/img/inputs/Arcade-Stick-DR.png"       // images[27] - class DownRight
];

// Function to set image sources
function setImageSrc() {
  // Set source for each class, looping through elements of that class
  const classNames = [
    "A", "B", "C", "D", "Kick", "Punch", "360", 
    "ChargeBack", "ChargeBack_Forward", "ChargeDown_Up",
    "ChargeDownBack", "Delta", "Down", "DP", 
    "HCB", "HCF", "Left_Right", "Left", 
    "QCB", "QCF", "Right", "UpLeft", 
    "UpRight", "Up", "Air", "Tap", 
    "DownLeft", "DownRight"
  ];

  classNames.forEach((className, index) => {
    const imgElements = document.getElementsByClassName(className);
    for (let i = 0; i < imgElements.length; i++) {
      if (imgElements[i] && images[index]) {
        imgElements[i].src = images[index]; // Set src for each element of that class
      }
    }
  });
}

// Call the function to set image sources
setImageSrc();
