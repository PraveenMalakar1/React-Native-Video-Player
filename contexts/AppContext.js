import React, { useState, createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [burgerClicked, setBurgerClicked] = useState(false);

    const toggleClicked = () => {
        setBurgerClicked(true);
        let overlay = document.getElementsByClassName('overlay');
        if (overlay.dataset.state = 'on') {
            overlay.dataset.state = 'off'
        } else {
            overlay.dataset.state = 'on';
        }
    }

    return (
        <AppContext.Provider value={{ toggleClicked, burgerClicked }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;