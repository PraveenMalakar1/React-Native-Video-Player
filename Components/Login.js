import React, { useContext, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions, TextInput } from "react-native";
import axios from 'axios';
import { AppContext } from "../contexts/AppContext";


export default function Login() {

    const { userState, setUserState } = useContext(AppContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        setSubmitted(true)
        e && e.preventDefault()
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

    console.log("userState, ", userState)

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/Logo.png')}
                style={styles.image}
            />
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
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} disabled={submitted} onPress={validateAndSend}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={displayError ? styles.show : styles.hide}>
                {errorData}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001b32",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40
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
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: "#001b32"
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    loginText: {
        color: "#001b32",
        fontWeight: "bold",
    },
    show: {
        opacity: 1,
        color: "#c30808",
        backgroundColor: "#fff",
        padding: 5,
        marginTop: 20,
    },
    hide: {
        opacity: 0
    }
});