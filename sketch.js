// Video
let video;
// To store the classification
let label = "";
// To store the images to show
let initImage = {
  src: null,
  fade: 0
};
let imgList = [];

function preload() {
  srcThumbsUp = loadImage("polisha.gif");
  srcHorns = loadImage("horns.gif")
  imgList.push(getImageWithSource(srcThumbsUp), getImageWithSource(srcHorns));
  console.log(imgList)
}

/**
 * Setup
 * - Configure handsfree (set which models, plugins, and gestures you want to use)
 */
function setup () {
  createCanvas(640, 480)
  handsfree = new Handsfree({
    //showDebug: true, // Comment this out to hide the default webcam feed with landmarks
    hands: true
  })
  handsfree.useGesture(gestures.hornGesture)
  handsfree.useGesture(gestures.thumbsupGesture)
  handsfree.enableGestures();
  // Create start model button
  buttonStart = createButton('Start Model')
  buttonStart.mousePressed(() => handsfree.start())
  // Create a stop button
  buttonStop = createButton('Stop Model')
  buttonStop.mousePressed(() => handsfree.stop())
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}



function draw () {
  background(0)
  tint(255)
  //Draw and flip the video
  push();
  scale(-1,1)
  image(video, -width, 0);
  pop();
  label = getHandGestureLabel()
  fillImageFadeByLabel(label);
  drawImage(imgList);
  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

function getImageWithSource(source) {
  return {
    ...initImage,
    src: source
  }
}

function fillImageFadeByLabel(label) {
  switch(label) {
    case "thumbsup":
      imgList[0].fade = 255;
      break;
    case "horns":
      imgList[1].fade = 255;
      break;
    default:
      break;    
  }
}

function drawImage(imageList) {
  imageList.map(img => {
    if(img.fade > 0) {
      tint(255, img.fade);
      image(img.src, width - 300, 0, 200, 150);
      img.fade -= 20;
    }
  })
}

function getHandGestureLabel () {
  const hands = handsfree.data?.hands
    if (hands?.gesture) {
       if(hands.gesture[0]) {
        return hands.gesture[0].name ? hands.gesture[0].name : ""
       }
     
    }
}
