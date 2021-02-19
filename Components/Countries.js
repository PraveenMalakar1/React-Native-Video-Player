import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import ScreenHeader from '../Utils/ScreenHeader'
const Countries = () => {

  return (
    <SafeAreaView>
      <View>
        <ScreenHeader title={"Countries"} />
      </View>
    </SafeAreaView>
  );
};

export default Countries;