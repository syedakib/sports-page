import React, {createContext, useState} from 'react'


export const PlayerContext = createContext();

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    return (
        <PlayerContext.Provider value={{ players, setPlayers }}>
            {children}
        </PlayerContext.Provider>
    );
};
