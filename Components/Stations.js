import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions, FlatList, Image, Pressable, ScrollView } from "react-native";
import ScreenHeader from '../Utils/ScreenHeader'
import { useQuery } from '@apollo/client'
import AppLoading from "../Utils/AppLoading";
import { QUERY_ALL_STATIONS } from "../Queries/stations"
import { AppContext } from '../contexts/AppContext';
import SoundPlayer from 'react-native-sound-player'


const { width } = Dimensions.get("window");

const StationItem = ({ station, onPress }) => {
    const { title, image } = station

    //console.log("image is sdf, ", image && image.url)

    return (
        <Pressable onPress={onPress} style={{ display: "flex", flexDirection: "column", margin: 5 }}>
            <Image
                source={{ uri: image && image.url }}
                style={{ width: width / 2.7, height: 80, borderRadius: 5 }}
            />
            <Text>{title}</Text>
        </Pressable>
    )
}

const Stations = ({ navigation, route }) => {

    const { stationsList, setStationsList, setTrack } = useContext(AppContext)

    //console.log("t is, ", stationsList, setStationsList)

    //console.log("route, ", route.params && route.params.Country)

    let selectedCountry = route.params && route.params.Country

    let criteria = { active: true }
    if (
        selectedCountry &&
        selectedCountry.id &&
        selectedCountry.title !== "All"
    ) {
        criteria["country_in"] = selectedCountry.id
    }

    const { data, loading } = useQuery(QUERY_ALL_STATIONS)

    if (loading) {
        return <AppLoading />
    }

    setStationsList(data && data.stations)

    const myFuntion = () => {
        console.log("my funtion called")
    }

    //console.log("data is, ", data)

    return (
        <SafeAreaView>
            <View>
                <ScreenHeader title={selectedCountry.title + " Stations"} />
            </View>
            <View style={styles.content}>
                <Text style={styles.bigText}>All Stations Are Here</Text>
                <ScrollView>
                    <FlatList
                        data={data && data.stations}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <StationItem
                                station={item}
                                onPress={() => {
                                    myFuntion()
                                    setTrack(item)
                                }}
                            />
                        )}
                        keyExtractor={(country) => country.id.toString()}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        width: width / 1.2,
        alignSelf: "center"
    },
    bigText: {
        color: "#001b32",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center"
    },
    smallText: {
        color: "#001b32",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    }
});

export default Stations;