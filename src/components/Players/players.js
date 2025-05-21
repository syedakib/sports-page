import React, { useEffect, useState, useContext } from 'react';
import { PlayerContext } from '../../PlayerContext';
import useUpdatePlayerName from '../../utils/updatePlayerName'
import './players.css';

const Players = () => {
    const {players, setPlayers} = useContext(PlayerContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {
        // players,
        // setPlayers,        
        editingPlayerId,
        setEditingPlayerId,
        newName,
        setNewName,
        updatePlayerName,
    } = useUpdatePlayerName([]);

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch players');
                }
                return response.json();
            })
            .then((data) => {
                setPlayers(data.users);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [setPlayers]);

    return (
        <div className="players-page">
            <h5>Players</h5>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul className="players-list">
                {players.map((player) => (
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