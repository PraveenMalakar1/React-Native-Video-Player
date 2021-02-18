import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import VideoPlayer from './Components/VideoPlayer';
import AudioPlayer from './Components/AudioPlayer';
import { enableScreens } from 'react-native-screens'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Video"
          component={VideoPlayer}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Audio" component={AudioPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
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