import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Players from './players';
import { PlayerContext } from '../useContexts/PlayerContext';
import useUpdatePlayerName from '../../utils/updatePlayerName';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query');
jest.mock('../../utils/updatePlayerName');


const mockPlayers = [
    { id: 1, firstName: 'Alice' },
    { id: 2, firstName: 'Bob' },
];

const mockSetPlayers = jest.fn();

test('renders players list', () => {
  useQuery.mockReturnValue({
    data: mockPlayers,
    isLoading: false,
    isError: false,
  });

  useUpdatePlayerName.mockReturnValue({
    editingPlayerId: null,
    setEditingPlayerId: jest.fn(),
    newName: '',
    setNewName: jest.fn(),
    updatePlayerName: jest.fn(),
  });

  render(
    <PlayerContext.Provider value={{ players: mockPlayers, setPlayers: mockSetPlayers }}>
      <Players />
    </PlayerContext.Provider>
  );

  expect(screen.getByText('Players')).toBeInTheDocument();
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});
