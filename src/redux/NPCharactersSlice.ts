import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Folders, NPCInitialState, NPCWithAvatar } from '../types/types';

const initialState: NPCInitialState = { npcs: [], folders: [] };

export const NPCharactersSlice = createSlice({
  name: 'NPCharacters',
  initialState,
  reducers: {
    setNPCharacters: (state: any, action: PayloadAction<NPCWithAvatar[]>) => {
      return { ...state, npcs: action.payload };
    },
    setFolders: (state: NPCInitialState, action: PayloadAction<Folders[]>) => {
      return { ...state, folders: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNPCharacters, setFolders } = NPCharactersSlice.actions;

export default NPCharactersSlice.reducer;
