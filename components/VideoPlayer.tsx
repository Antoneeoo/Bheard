import { useRef, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View } from './Themed';
import { Video, AVPlaybackStatus } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV.types';

interface VideoProps {
    videoResource: AVPlaybackSource
}

const VideoPlayer: React.FunctionComponent<VideoProps> = ({
    videoResource
}) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    return (
        <View>
            <Video
                ref={video}
                source={videoResource}
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                shouldPlay
            />
        </View>
    );
}

export default VideoPlayer;