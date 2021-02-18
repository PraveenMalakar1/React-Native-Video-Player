import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Controller({ onNext, onPrv, pauseSong, playing, playSong, totalSongs, currentSongIndex, setTrack, soundData }) {
  console.log("currentSongIndex, ", currentSongIndex, "totalSongs, ", totalSongs, playing)
  return (
    <View style={styles.container}>
      {currentSongIndex !== 1 ? <TouchableOpacity onPress={onPrv}>
        <Icon style={{ color: "#fff" }} name="step-backward" size={30} />
      </TouchableOpacity> : <TouchableOpacity>
          <Icon style={{ color: "#555" }} name="step-backward" size={30} />
        </TouchableOpacity>}
      {playing ? <TouchableOpacity onPress={pauseSong}>
        <Icon style={{ color: "#fff" }} name="pause" size={30} />
      </TouchableOpacity> : <TouchableOpacity onPress={playSong}>
          <Icon style={{ color: "#fff" }} name="play" size={30} />
        </TouchableOpacity>}
      {currentSongIndex !== totalSongs ? <TouchableOpacity onPress={onNext}>
        <Icon style={{ color: "#fff" }} name="step-forward" size={30} />
      </TouchableOpacity> : <TouchableOpacity>
          <Icon style={{ color: "#555" }} name="step-forward" size={30} />
        </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});