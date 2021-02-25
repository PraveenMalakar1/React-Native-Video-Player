import React, { useContext, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions, TextInput } from "react-native";
import axios from 'axios';
import { AppContext } from "../contexts/AppContext";
import styled from 'styled-components/native';
import {
    ROLE_STATIONADMIN,
    ROLE_LISTENER,
} from "../Utils/props"

export default function Register({ navigation }) {

    const { userState, setUserState } = useContext(AppContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(ROLE_LISTENER);
    const [firstname, setFirstName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [contactnumber, setContactNumber] = useState("");
    const [lastname, setLastName] = useState("");
    const [displayError, setDisplayError] = useState(false)
    const [errorData, setErrorData] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const showError = error => {
        setErrorData(error)
        setDisplayError(true)
        setTimeout(() => {
            hideError()
        }, 3000)
    }

    const hideError = () => {
        setDisplayError(false)
    }

    const validateAndSend = e => {
        console.log("validateAndSend called")
        e && e.preventDefault()

        if (!firstname) {
            showError("Please add first name")
            return
        }
        if (!lastname) {
            showError("Please add last name")
            return
        }

        if (
            (role === ROLE_STATIONADMIN) &&
            !displayName
        ) {
            showError("Please add display name")
            return
        }

        if (
            (role === ROLE_STATIONADMIN) &&
            !contactnumber
        ) {
            showError("Please add Contact Number")
            return
        }
        if (contactnumber) {
            const contactNumberCheck = '^[\+]?[0-9]*$'
            if (!contactnumber.match(contactNumberCheck)) {
                showError("Contact can only contain number but can optionally start with + sign")
                return
            }
        }

        if (!email || !password) {
            showError("Please enter email/password")
            // clear error after some time
            return
        }

        axios.post('https://server.stream-africa.com/auth/local', {
            identifier: email,
            password: password,
        })
            .then(function (response) {
                setSubmitted(true)
                if (response.data.jwt) {
                    const user = response.data.user
                    setUserState({
                        ...userState,
                        isLoggedIn: true,
                        confirmed: user.confirmed,
                        blocked: user.blocked,
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        email: user.email,
                        provider: user.provider,
                        role: user.role,
                        stationID: response.data.stationID,
                        station: response.data.station,
                        artist: response.data.artist,
                    })
                    setSubmitted(false)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    showError(
                        error.response.data.message[0].messages[0].message.replace(
                            "Identifier",
                            "Email"
                        )
                    )
                }
                setSubmitted(false)
            });
    }

    console.log("role, ", role)

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/Logo.png')}
                style={styles.image}
            />
            <SwitchPanel>
                <PanelTab
                    onPress={() => setRole(ROLE_LISTENER)}
                >
                    <Text style={styles.listenerRoleText}> Listener </Text>
                </PanelTab>
                <PanelTab
                    onPress={() => setRole(ROLE_STATIONADMIN)}
                >
                    <Text style={styles.stationAdminRoleText}> Station </Text>
                </PanelTab>
            </SwitchPanel>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="First Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(firstname) => setFirstName(firstname)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Last Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(lastname) => setLastName(lastname)}
                />
            </View>
            {role === ROLE_STATIONADMIN && <>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Station Display Name"
                        placeholderTextColor="#003f5c"
                        onChangeText={(displayName) => setDisplayName(displayName)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Contact Number"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(contactnumber) => setContactNumber(contactnumber)}
                    />
                </View>
            </>}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.RegisterBtn} disabled={submitted} onPress={validateAndSend}>
                <Text style={styles.loginText}>SUBMIT</Text>
            </TouchableOpacity>
            <Text style={displayError ? styles.show : styles.hide}>
                {errorData}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.login_link}> Already have an account?</Text>
            </TouchableOpacity>
        </View>
    );
}


const SwitchPanel = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`

const PanelTab = styled.TouchableOpacity`
  padding: 10px 20px;
`

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001b32",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 10
    },
    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },
    login_link: {
        marginTop: 20,
        marginBottom: 50,
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
    RegisterBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginTop: 20
    },
    listenerRoleText: {
        color: "#fff",
        fontSize: 20,
    },
    stationAdminRoleText: {
        color: "#fff",
        fontSize: 20,
    },
    loginText: {
        color: "#001b32",
        fontWeight: "bold",
        fontSize: 20,
    },
    show: {
        display: "flex",
        color: "#c30808",
        backgroundColor: "#fff",
        padding: 5,
        marginTop: 20,
    },
    hide: {
        display: "none"
    }
});