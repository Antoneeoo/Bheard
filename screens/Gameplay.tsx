import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import PlayGame  from '../state/Placeholder';
import { RootTabScreenProps } from '../types';

export default function Gameplay({ navigation }: RootTabScreenProps<'Gameplay'>) {

  useEffect(() => {
    PlayGame();  
  }, [])

  return (
    <View style={styles.container}>
        <canvas id="viewport" width="628" height="628"></canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
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
// AddSignScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // or use react-native-image-picker

const AddSignScreen = () => {
  const [signMeaning, setSignMeaning] = useState('');
  const [signImage, setSignImage] = useState(null);
  const [customSigns, setCustomSigns] = useState([]);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSignImage(pickerResult.assets[0].uri);
    }
  };

  const saveSign = () => {
    if (!signMeaning || !signImage) {
      Alert.alert("Please add both a sign image and a meaning.");
      return;
    }

    const newSign = { meaning: signMeaning, image: signImage };
    setCustomSigns([...customSigns, newSign]);
    Alert.alert("Sign saved!");
    setSignMeaning('');
    setSignImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Own Sign</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter meaning (e.g., Thank You)"
        value={signMeaning}
        onChangeText={setSignMeaning}
      />
      <Button title="Upload Sign Image" onPress={pickImage} />
      {signImage && <Image source={{ uri: signImage }} style={styles.image} />}
      <Button title="Save Sign" onPress={saveSign} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10
  }
});

export default AddSignScreen;
import AddSignScreen from './AddSignScreen';

export default function App() {
  return <AddSignScreen />;
}
