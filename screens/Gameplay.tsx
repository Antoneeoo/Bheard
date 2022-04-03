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
