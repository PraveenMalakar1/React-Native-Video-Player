import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import VideoPlayer from './Components/VideoPlayer';
import AudioPlayer from './Components/AudioPlayer';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Countries from './Components/Countries'
import Stations from './Components/Stations'
import LogoImage from './Components/LogoImage'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AppLoading from './Utils/AppLoading'
import { persistCache } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-community/async-storage'
import AppContextProvider from "./contexts/AppContext"
import Login from './Components/Login';
import Register from './Components/Register';
import { SERVER_URL } from './Utils/props'

const Stack = createStackNavigator();


const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: SERVER_URL + 'graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

// function CustomDrawerContent(props) {
//   console.log("props are, ", props)
//   return (
//     <DrawerContentScrollView style={styles.drawer} {...props}>
//       <LogoImage />
//       <View
//         style={{
//           borderColor: '#001b32',
//           borderWidth: 1
//         }}
//       ><Text>&nbsp;</Text></View>
//       <DrawerItemList labelStyle={styles.menu} {...props} />
//       {/* <DrawerItem labelStyle={styles.menu}
//         label="Close drawer"
//         onPress={() => props.navigation.closeDrawer()}
//       />
//       <DrawerItem labelStyle={styles.menu}
//         label="Toggle drawer"
//         onPress={() => props.navigation.toggleDrawer()}
//       /> */}
//     </DrawerContentScrollView>
//   );
// }

const Drawer = createDrawerNavigator();

function AppDrawer() {
  
  return (
    <Drawer.Navigator drawerContent={props => {
      const filteredProps = {
        ...props,
        state: {
          ...props.state,
          routeNames: props.state.routeNames.filter(
            // To hide single option
            // (routeName) => routeName !== 'HiddenPage1',
            // To hide multiple options you can add & condition
            (routeName) => {
              routeName !== 'Stations'
            },
          ),
          routes: props.state.routes.filter(
            (route) =>
              route.name !== 'Stations' && route.name !== 'AudioPlayer' && route.name !== 'VideoPlayer'
          ),
        },
      };
      console.log("filteredProps, ", filteredProps.state)
      return (
        <DrawerContentScrollView style={styles.drawer} {...filteredProps}>
          <LogoImage />
          <View
            style={{
              borderColor: '#001b32',
              borderWidth: 1
            }}
          ><Text>&nbsp;</Text></View>
          <DrawerItemList labelStyle={styles.menu} {...filteredProps} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Countries" options={{ drawerLabel: 'Countries' }} component={Countries} />
      <Drawer.Screen name="AudioPlayer" options={{ drawerLabel: 'AudioPlayer' }} component={AudioPlayer} />
      <Drawer.Screen name="VideoPlayer" options={{ drawerLabel: 'VideoPlayer' }} component={VideoPlayer} />
      <Drawer.Screen name="Stations" options={{ drawerLabel: 'Stations' }} component={Stations} />
      <Drawer.Screen name="Login" options={{ drawerLabel: 'Login' }} component={Login} />
      <Drawer.Screen name="Register" options={{ drawerLabel: 'Register' }} component={Register} />
    </Drawer.Navigator>
  );
}

const App = () => {

  const [loadingCache, setLoadingCache] = useState(true)

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  if (loadingCache) {
    return <AppLoading />
  }

  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <NavigationContainer>
          <AppDrawer />
        </NavigationContainer>
        <AudioPlayer />
      </AppContextProvider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#001b32",
    paddingTop: 10
  },
  menu: {
    color: "#fff"
  }
});

export default App;