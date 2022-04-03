import * as WebBrowser from 'expo-web-browser';
import { View } from './Themed';
import VideoPlayer from './VideoPlayer';

const VideoCarousel: React.FunctionComponent = () => {
    return (
        <View>
            <VideoPlayer />
        </View>
    );
}

export default VideoCarousel;