import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Controller({ onNext, onPrv }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv}>
        <Icon style={{color: "#fff"}} name="step-backward" size={30} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon style={{color: "#fff"}} name="pause" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Icon style={{color: "#fff"}} name="step-forward" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});