import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions, FlatList, Image, Pressable, ScrollView } from "react-native";
import ScreenHeader from '../Utils/ScreenHeader'
import { gql, useQuery } from '@apollo/client'
import AppLoading from "../Utils/AppLoading";

const ALL_COUNTRIES = gql`
  query AllCountries($offset: Int, $max: Int, $order: String) {
    countries(start: $offset, limit: $max, sort: $order) {
      id
      title
      Timezone
      slug
      image {
        id
        url
      }
    }
  }
`


const { width } = Dimensions.get("window");

const CountryItem = ({ country, onPress }) => {
  const { title, image } = country

  console.log("image is, ", image)

  return (
    <Pressable onPress={onPress} style={{display: "flex", flexDirection:"column", margin: 5}}>
      <Image
        source={{ uri: image.url }}
        style={{ width: width/2.7, height: 80, borderRadius: 5 }}
      />
      <Text>{title}</Text>
    </Pressable>
  )
}

const Countries = ({ navigation }) => {

  const { data, loading } = useQuery(ALL_COUNTRIES)

  if (loading) {
    return <AppLoading />
  }

  console.log("data is, ", data)

  return (
    <SafeAreaView>
      <View>
        <ScreenHeader title={"Countries"} />
      </View>
      <View style={styles.content}>
        <Text style={styles.bigText}>WELCOME TO STREAM AFRICA </Text>
        <Text style={styles.smallText}>AFRICA'S FAVORITE ONLINE RADIO PLATFORM </Text>
        <Text style={styles.bigText}>CLICK A FLAG BELOW</Text>
        <Text style={styles.smallText}>AND LISTEN TO LIVE ONLINE RADIO ACROSS AFRICA</Text>
        <ScrollView>
          <FlatList
            data={data && data.countries}
            numColumns={2}
            renderItem={({ item }) => (
              <CountryItem
                country={item}
                onPress={() => console.log('Country', { Country: item })}
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

export default Countries;