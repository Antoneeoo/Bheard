import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function WelcomeScreen({ navigation }: RootTabScreenProps<'Welcome'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>Check out the other tab to try gameplay.</Text>
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
