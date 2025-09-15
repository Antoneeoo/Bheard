/**
 * This screen is the core of the sign language translation prototype.
 * It uses the device's camera to detect hand poses in real-time and
 * classifies them into ASL signs.
 */

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import Tts from 'react-native-tts';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { classify } from '../ml/SignClassifier';

// Wraps the Camera component to provide a tensor stream.
const TensorCamera = cameraWithTensors(Camera);

export default function TranslateScreen() {
  // State variables
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [translatedText, setTranslatedText] = useState('Translated text will appear here.');
  const [model, setModel] = useState<handPoseDetection.HandDetector | null>(null);
  const [hands, setHands] = useState<any[]>([]);
  const cameraRef = useRef(null);

  // Function to speak the translated text
  const speak = () => {
    Tts.speak(translatedText);
  };

  // Load the hand pose detection model when the component mounts.
  useEffect(() => {
    async function setup() {
      await tf.ready();
      const model = await handPoseDetection.createDetector(
        handPoseDetection.SupportedModels.MediaPipeHands,
        { runtime: 'tfjs' }
      );
      setModel(model);
    }
    setup();
  }, []);

  // This function is called for each frame from the camera.
  const handleCameraStream = (images: any) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (nextImageTensor) {
        // Detect hands in the current frame.
        const hands = await model?.estimateHands(nextImageTensor);
        setHands(hands || []);
        // If hands are detected, classify the sign.
        if (hands && hands.length > 0) {
          const sign = classify(hands[0].keypoints);
          setTranslatedText(sign);
        }
        tf.dispose(nextImageTensor);
      }
      // Request the next frame.
      requestAnimationFrame(loop);
    };
    loop();
  };

  // Request camera permission when the component mounts.
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Render a loading indicator or an error message if camera permission is not granted.
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Render the main component.
  return (
    <View style={styles.container}>
      <TensorCamera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        onReady={handleCameraStream}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        autorender={true}
        cameraTextureHeight={Platform.OS === 'ios' ? 1920 : 1200}
        cameraTextureWidth={Platform.OS === 'ios' ? 1080 : 1600}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Flip"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        />
      </View>
      {renderHands()}
      <View style={styles.translationContainer}>
        <Text style={styles.translationText}>{translatedText}</Text>
        <Button title="🔊 Speak" onPress={speak} />
      </View>
    </View>
  );

  // Renders the detected hand keypoints on the screen.
  function renderHands() {
    return (
      <View style={styles.handsContainer}>
        {hands.map((hand, i) => (
          <View key={i}>
            {hand.keypoints.map((keypoint: any) => (
              <View
                key={keypoint.name}
                style={[
                  styles.keypoint,
                  {
                    left: keypoint.x,
                    top: keypoint.y,
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 100,
  },
  handsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  keypoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  translationContainer: {
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  translationText: {
    fontSize: 20,
  },
});
