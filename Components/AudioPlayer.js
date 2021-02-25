import React, { useRef, useEffect, useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";
import Controller from "./Controller";
import SoundPlayer from 'react-native-sound-player'
import { AppContext } from "../contexts/AppContext";

const { width, height } = Dimensions.get("window");

export default function Player({ navigation, route }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { track, setTrack, stationsList } = useContext(AppContext)
  const slider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false)
  const [isTrackLoading, setTrackLoading] = useState(false)
  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;

  var onFinishedPlayingSubscription = false
  var onFinishedLoadingSubscription = false
  var onFinishedLoadingURLSubscription = false

  useEffect(() => {
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });


    // setTrack(stationsList.length > 0 && stationsList[0].streamuri)

    // console.log("songIndex, ", track)

    // if (track !== undefined || track !== null) {
    //   setPlaying(true)
    //   SoundPlayer.play()
    // }

    // scrollX.addListener(({ value }) => {
    //   const val = Math.round(value / width);

    //   setSongIndex(val);

    //   // little buggy
    //   //if previous index is not same then only update it
    //   // if (val !== songIndex) {
    //   //   setSongIndex(val);
    //   //   console.log(val);
    //   // }
    // });

    onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      console.log('finished playing', success)
    })
    onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
      console.log('finished loading', success)
    })
    onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
      setTrackLoading(success)
    })

    console.log("stationsList.length > 0 && stationsList[0], ", stationsList.length > 0 && stationsList[0])

    // setTrack(stationsList.length > 0 && stationsList[0])

    // if (track !== undefined) {
    //   SoundPlayer.playUrl(track.streamuri)
    // }

    // return () => {
    //   scrollX.removeAllListeners();
    // };
  }, []);

  console.log("isTrackLoading, ", isTrackLoading, "track is, ", track !== undefined && track)

  // const goNext = () => {
  //   setPlaying(false)
  //   setTrackLoading(false)
  //   SoundPlayer.unmount()
  //   let trackURL = stationsList[songIndex + 1].url
  //   slider.current.scrollToOffset({
  //     offset: (songIndex + 1) * width,
  //   });
  //   SoundPlayer.playUrl(trackURL)
  //   console.log("playing, ", trackURL)
  // };
  // const goPrv = () => {
  //   setPlaying(false)
  //   setTrackLoading(false)
  //   SoundPlayer.unmount()
  //   let trackURL = stationsList[songIndex - 1].url
  //   slider.current.scrollToOffset({
  //     offset: (songIndex - 1) * width,
  //   });
  //   SoundPlayer.playUrl(trackURL)

  //   console.log("playing, ", trackURL)
  // };

  const pauseSong = () => {
    setPlaying(false)
    SoundPlayer.pause()
  }

  const playSong = () => {
    setPlaying(true)
    SoundPlayer.play()
  }

  // const renderItem = ({ index, item }) => {
  //   return (
  //     <Animated.View
  //       style={{
  //         alignItems: "center",
  //         width: width,
  //         transform: [
  //           {
  //             translateX: Animated.multiply(
  //               Animated.add(position, -index),
  //               -100
  //             ),
  //           },
  //         ],
  //       }}
  //     >
  //       <Animated.Image
  //         source={{ uri: item.image }}
  //         style={{ width: 320, height: 320, borderRadius: 5 }}
  //       />
  //     </Animated.View>
  //   );
  // };

  return (
    <View style={styles.container}>
      {/* {isShowCardUI && <>
        <SafeAreaView style={{ height: 320 }}>
          <Animated.FlatList
            ref={slider}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            data={stationsList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          />
        </SafeAreaView>
        <View>
          <Text style={styles.title}>{stationsList[songIndex].title}</Text>
          <Text style={styles.artist}>{stationsList[songIndex].artist}</Text>
        </View>
      </>
      } */}

      <Controller style={styles.controls} //onNext={goNext} onPrv={goPrv}
        isTrackLoading={isTrackLoading} pauseSong={pauseSong}
        playing={playing} playSong={playSong}
        totalSongs={stationsList.length}
        //currentSongIndex={songIndex + 1}
        //setTrack={setTrack}
        soundData={track !== undefined && track}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
    color: "#000"
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
    color: "#000"
  },
  container: {
    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 10
  },
  controls: {
    display: "none"
  }
});