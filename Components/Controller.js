import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'

const { width, height } = Dimensions.get("window");

export default function Controller({ isTrackLoading, pauseSong, playing, playSong, totalSongs, soundData }) {
  let soundInfo = soundData !== undefined && soundData
  console.log("soundInfo is, ", soundInfo)
  return (
    <View style={styles.container}>
      <View style={styles.trackInfo}>
        <Image
          source={{ uri: soundInfo && soundInfo.image && soundInfo.image.url }}
          style={styles.trackImage}
        />
        <View>
          <Text style={styles.trackTitle}>{soundInfo && soundInfo.title}</Text>
          <Text style={styles.trackSubTitle}>{soundInfo && soundInfo.country && soundInfo.country.title}</Text>
        </View>
      </View>
      {/* {currentSongIndex !== 1 ? <TouchableOpacity onPress={onPrv}>
        <Icon style={{ color: "#000" }} name="step-backward" size={25} />
      </TouchableOpacity> : <TouchableOpacity>
          <Icon style={{ color: "#555" }} name="step-backward" size={25} />
        </TouchableOpacity>} */}
      <View>
        {!isTrackLoading ?
          <TouchableOpacity>
            <Icon style={{ color: "#000" }} name="spinner" size={30} />
          </TouchableOpacity> : <>{playing ? <TouchableOpacity onPress={pauseSong}>
            <Icon style={{ color: "#000" }} name="pause" size={30} />
          </TouchableOpacity> : <TouchableOpacity onPress={playSong}>
              <Icon style={{ color: "#000" }} name="play" size={30} />
            </TouchableOpacity>}</>}
      </View>
      {/* {currentSongIndex !== totalSongs ? <TouchableOpacity onPress={onNext}>
        <Icon style={{ color: "#000" }} name="step-forward" size={25} />
      </TouchableOpacity> : <TouchableOpacity>
          <Icon style={{ color: "#555" }} name="step-forward" size={25} />
        </TouchableOpacity>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  trackInfo: {
    width: width / 1.2,
    flexDirection: "row"
  },
  trackImage: {
    width: 40,
    height: 40,
    borderRadius: 0,
    marginRight: 10
  },
  trackTitle: {
    fontWeight: "bold",
    fontSize: 16
  },
  trackSubTitle: {
    fontWeight: "normal"
  }
});