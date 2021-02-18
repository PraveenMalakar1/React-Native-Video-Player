import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';

const Navigation = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Video"
        component={VideoPlayer}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <AuthStack.Screen
        name="Audio"
        component={AudioPlayer}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
    </AuthStack.Navigator>
  );
};

export default Navigation;