/**
 * A very simple sign classifier for ASL alphabet letters A, B, and C.
 * This is a proof-of-concept and not a robust sign language recognizer.
 * The logic is based on simple heuristics about the relative positions of hand keypoints.
 */

// Keypoint indices for MediaPipe Hands
const WRIST = 0;
const THUMB_TIP = 4;
const INDEX_FINGER_TIP = 8;
const MIDDLE_FINGER_TIP = 12;
const RING_FINGER_TIP = 16;
const PINKY_TIP = 20;
const THUMB_IP = 3;
const INDEX_FINGER_MCP = 5;


/**
 * Classifies a hand pose into one of the supported signs.
 * @param keypoints The hand keypoints detected by the model.
 * @returns The recognized sign, or a message indicating no sign was recognized.
 */
export function classify(keypoints: any[]) {
  if (!keypoints || keypoints.length === 0) {
    return 'No hands detected';
  }

  // Helper function to check if the hand is in a fist-like shape.
  const isFist = (keypoints: any[]) => {
    const thumbTip = keypoints[THUMB_TIP];
    const indexTip = keypoints[INDEX_FINGER_TIP];
    const middleTip = keypoints[MIDDLE_FINGER_TIP];
    const ringTip = keypoints[RING_FINGER_TIP];
    const pinkyTip = keypoints[PINKY_TIP];

    // A simple check: are the fingertips above the thumb tip?
    if (
      indexTip.y > thumbTip.y &&
      middleTip.y > thumbTip.y &&
      ringTip.y > thumbTip.y &&
      pinkyTip.y > thumbTip.y
    ) {
      return false;
    }

    // Check if thumb is outside the fist.
    if (thumbTip.x < keypoints[THUMB_IP].x) {
        return true;
    }

    return false;
  };

  // Helper function to check if all fingers are pointing up.
  const areFingersUp = (keypoints: any[]) => {
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

  // Classify the sign based on the heuristics.
  if (isFist(keypoints)) {
    return 'A';
  }

  if (areFingersUp(keypoints)) {
    // This is a simplification. 'B' is more complex.
    // For 'B', the thumb is tucked in.
    const thumbTip = keypoints[THUMB_TIP];
    const indexMcp = keypoints[INDEX_FINGER_MCP];
    if (thumbTip.x < indexMcp.x) {
        return 'B'
    }
  }

  return 'No sign recognized';
}
