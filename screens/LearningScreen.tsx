import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import VideoCarousel from '../components/VideoCarousel';
import Videos from '../assets/videos/Videos';
import { RootStackScreenProps } from '../types';

export default function LearningScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
    const [wordIndex, setWordIndex] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Practice Words</Text>
            <VideoCarousel videos={Videos.levels[0]} signs={Object.keys(Videos.levels[0])}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
