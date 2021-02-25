import React, { useState, createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [stationsList, setStationsList] = useState([]);
    const [track, setTrack] = useState([]);

    return (
        <AppContext.Provider value={{ stationsList, setStationsList, track, setTrack }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;