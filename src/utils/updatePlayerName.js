import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlayerContext } from '../components/useContexts/PlayerContext';

const useUpdatePlayerName = (updatePlayerFn) => {
    const {players, setPlayers} = useContext(PlayerContext);
    const [editingPlayerId, setEditingPlayerId] = useState(null);
    const [newName, setNewName] = useState('');

    const queryClient= useQueryClient();

    const mutation= useMutation({
        mutationFn: updatePlayerFn,
        onSuccess: (updatedPlayer, variables) => {
            setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === updatedPlayer.id
                     ? { ...player, firstName: variables.newName } : player
                )
            );
            queryClient.invalidateQueries(['players']);
        },
    });

    const updatePlayerName = (id, newName) => {
        mutation.mutate({id, newName});
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