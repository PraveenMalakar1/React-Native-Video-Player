import React, { useState, createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
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

    return (
        <AppContext.Provider value={{ stationsList, setStationsList, track, setTrack, userState, setUserState }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;