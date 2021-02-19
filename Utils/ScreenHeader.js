import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const ScreenHeader = ({ title }) => {

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#001b32",
        height: 50,
        justifyContent: "space-around"
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        paddingLeft: 10,
        fontSize: 20
    }
});

export default ScreenHeader;