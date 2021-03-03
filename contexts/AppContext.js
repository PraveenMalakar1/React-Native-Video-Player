import { from } from '@apollo/client';
import React, { useState, createContext } from 'react';
import { Dimensions } from 'react-native'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const onLoadDimensions = Dimensions.get("screen")

    const [stationsList, setStationsList] = useState([]);
    const [track, setTrack] = useState([]);
    // User State & Methods
    const [userState, setUserState] = useState({
        isLoggedIn: false,
        requestSignin: false,
        // User Data From Response
        confirmed: null,
        blocked: null,
        id: null,
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        provider: null,
        role: null,
        stationID: null,
        station: null,
        artist: null,
    })

    const [deviceSize, setDeviceSize] = useState({
        width: onLoadDimensions.width,
        height: onLoadDimensions.height
    });

    Dimensions.addEventListener("change", () => {
        const dim = Dimensions.get("screen")
        setDeviceSize({
            width: dim.width,
            height: dim.height
        })
    })

    return (
        <AppContext.Provider value={{ stationsList, setStationsList, track, setTrack, userState, setUserState, deviceSize }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;