import { useState, useContext } from 'react';
import { PlayerContext } from '../components/useContexts/PlayerContext';

const useUpdatePlayerName = (initialPlayers) => {
    const {players, setPlayers} = useContext(PlayerContext);
    const [editingPlayerId, setEditingPlayerId] = useState(null);
    const [newName, setNewName] = useState('');

    const updatePlayerName = (id, newName) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id ? { ...player, firstName: newName } : player
            )
        );
        setEditingPlayerId(null);
        setNewName('');
    };

    return {
        players,
        setPlayers,
        editingPlayerId,
        setEditingPlayerId,
        newName,
        setNewName, 
        updatePlayerName,
    };
};

export default useUpdatePlayerName;