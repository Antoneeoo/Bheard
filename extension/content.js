console.log("Sign Language Translator content script loaded.");

// Helper function to load a script dynamically
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// --- Sign Classifier Logic ---
// (Copied from ml/SignClassifier.ts)

const WRIST = 0;
const THUMB_TIP = 4;
const INDEX_FINGER_TIP = 8;
const MIDDLE_FINGER_TIP = 12;
const RING_FINGER_TIP = 16;
const PINKY_TIP = 20;
const THUMB_IP = 3;
const INDEX_FINGER_MCP = 5;

function classify(keypoints) {
  if (!keypoints || keypoints.length === 0) {
    return 'No hands detected';
  }

  const isFist = (keypoints) => {
    const thumbTip = keypoints[THUMB_TIP];
    const indexTip = keypoints[INDEX_FINGER_TIP];
    const middleTip = keypoints[MIDDLE_FINGER_TIP];
    const ringTip = keypoints[RING_FINGER_TIP];
    const pinkyTip = keypoints[PINKY_TIP];

    if (
      indexTip.y > thumbTip.y &&
      middleTip.y > thumbTip.y &&
      ringTip.y > thumbTip.y &&
      pinkyTip.y > thumbTip.y
    ) {
      return false;
    }

    if (thumbTip.x < keypoints[THUMB_IP].x) {
        return true;
    }

    return false;
  };

  const areFingersUp = (keypoints) => {
    const indexTip = keypoints[INDEX_FINGER_TIP];
    const middleTip = keypoints[MIDDLE_FINGER_TIP];
    const ringTip = keypoints[RING_FINGER_TIP];
    const pinkyTip = keypoints[PINKY_TIP];
    const wrist = keypoints[WRIST];

    return (
      indexTip.y < wrist.y &&
      middleTip.y < wrist.y &&
      ringTip.y < wrist.y &&
      pinkyTip.y < wrist.y
    );
  };

  if (isFist(keypoints)) {
    return 'A';
  }

  if (areFingersUp(keypoints)) {
    const thumbTip = keypoints[THUMB_TIP];
    const indexMcp = keypoints[INDEX_FINGER_MCP];
    if (thumbTip.x < indexMcp.x) {
        return 'B'
    }
  }

  return 'No sign recognized';
}

// --- End of Sign Classifier Logic ---


let model = null;
let translationBox = null;

function updateUI(text, videoElement) {
    if (!translationBox) {
        translationBox = document.createElement('div');
        translationBox.style.position = 'absolute';
        translationBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        translationBox.style.color = 'white';
        translationBox.style.padding = '10px';
        translationBox.style.borderRadius = '5px';
        translationBox.style.zIndex = '1000';
        // Position the box relative to the video element
        const rect = videoElement.getBoundingClientRect();
        translationBox.style.top = `${rect.top + window.scrollY + 10}px`;
        translationBox.style.left = `${rect.left + window.scrollX + 10}px`;
        document.body.appendChild(translationBox);
    }
    translationBox.textContent = text;
}


async function setup() {
  await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
  await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection');
  console.log("TensorFlow.js and hand-pose-detection model loaded.");

  const detector = await handPoseDetection.createDetector(
    handPoseDetection.SupportedModels.MediaPipeHands,
    { runtime: 'tfjs' }
  );
  model = detector;
  console.log("Hand pose detection model loaded.");
}

async function detectHands(video) {
  if (!model || !video) {
    return;
  }

  const hands = await model.estimateHands(video);
  if (hands.length > 0) {
    const sign = classify(hands[0].keypoints);
    updateUI(`Detected sign: ${sign}`, video);
  } else {
    updateUI("No hands detected.", video);
  }
}

async function startDetection() {
    await setup();

    setInterval(() => {
        // This selector is a guess for Google Meet's local video feed.
        const videoElement = document.querySelector('video[data-ssrc]');
        if (videoElement) {
            detectHands(videoElement);
        }
    }, 1000);
}

startDetection();
