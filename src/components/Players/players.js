import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlayerContext } from '../useContexts/PlayerContext';
import useUpdatePlayerName from '../../utils/updatePlayerName'
import './players.css';

const fetchPlayers = async () => {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
        throw new Error('Failed to fetch players');
    }
    const data = await response.json();
    return data.users;
};

const Players = () => {
    const { setPlayers, players } = useContext(PlayerContext);
    const {
        editingPlayerId,
        setEditingPlayerId,
        newName,
        setNewName,
        updatePlayerName,
    } = useUpdatePlayerName([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['players'],
        queryFn: fetchPlayers,
        onSuccess: (users) => setPlayers(users),
    });

    return (
        <div className="players-page">
            <h5>Players</h5>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul className="players-list">
                {(data || []).map((player) => (
                    <li key={player.id} className="player-item">
                        {editingPlayerId === player.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Enter new name"
                                />
                                <button onClick={() => updatePlayerName(player.id, newName)}>
                                    Save
                                </button>
                                <button onClick={() => setEditingPlayerId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h2>{player.firstName}</h2>
                                <button onClick={() => setEditingPlayerId(player.id)}>
                                    Update Name
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Players;