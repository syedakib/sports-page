import React, { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlayerContext } from '../useContexts/PlayerContext';
import useUpdatePlayerName from '../../utils/updatePlayerName'
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    TextField,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';
import './players.css';

const fetchPlayers = async () => { 
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
        throw new Error('Failed to fetch players');
    }
    const data = await response.json();
    return data.users;
};

const updatePlayerFn = async ({id, newName}) => {
    const response = await fetch(`https://dummyjson.com/users/${id}`,{
        method:  'PUT',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({firstName: newName}),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch players');
    }
    const updatedPlayer = await response.json();
    console.log('Updated', updatedPlayer)

    return {...updatedPlayer, id };
}

const Players = () => {
    const {  players, setPlayers  } = useContext(PlayerContext);
    const {
        editingPlayerId,
        setEditingPlayerId,
        newName,
        setNewName,
        updatePlayerName,
    } = useUpdatePlayerName(updatePlayerFn);

    const { data: fetchedPlayers ,
            isLoading,
            isError,
            error
        } = useQuery({        
        queryKey: ['players'],
        queryFn: fetchPlayers,
    });

    useEffect(()=> {
        if(fetchedPlayers && fetchedPlayers.length > 0){
            setPlayers(fetchedPlayers);
        }
    }, [fetchedPlayers, setPlayers])

    return (
        <Box className="players-page" sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>Players</Typography>
            {isLoading && <CircularProgress />}
            {isError && <Alert severity="error">{error.message}</Alert>}
            <Paper elevation={3}>
                <List>
                    {players.map((player) => (
                        <ListItem key={player.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            {editingPlayerId === player.id ? (
                                <Box sx={{ width: '100%' }}>
                                    <TextField
                                        fullWidth
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Enter new name"
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => updatePlayerName(player.id, newName)}
                                        sx={{ mr: 1 }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setEditingPlayerId(null)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <ListItemText
                                        primary={<Typography variant="h6">{player.firstName}</Typography>}
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={() => setEditingPlayerId(player.id)}
                                    >
                                        Update Name
                                    </Button>
                                </Box>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default Players;