import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './state/useCachedResources';
import useColorScheme from './state/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
import React from 'react';
import { View } from 'react-native';
import ASLVoiceOver from './ASLVoiceOver';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ASLVoiceOver word="Thank you" />
    </View>
  );
}
// ASLVoiceOver.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';

const ASLVoiceOver = ({ word = "Hello" }) => {
  const speakWord = () => {
    Tts.speak(word);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ASL Translation: {word}</Text>
      <Button title="🔊 Hear Word" onPress={speakWord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  }
});

export default ASLVoiceOver;
import React, { useEffect } from 'react';
import { Button, View, Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AskCameraPermission = () => {
  const askForCamera = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      Alert.alert('Camera access granted');
    } else {
      Alert.alert('Camera access denied');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Ask for Camera Access" onPress={askForCamera} />
    </View>
  );
};

export default AskCameraPermission;
import React from 'react';
import AskCameraPermission from './AskCameraPermission';

export default function App() {
  return <AskCameraPermission />;
}
