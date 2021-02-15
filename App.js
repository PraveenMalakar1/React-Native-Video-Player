import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoPlayer from './Components/VideoPlayer';
import AudioPlayer from './Components/AudioPlayer';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <VideoPlayer />       */}
      <AudioPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export default App;