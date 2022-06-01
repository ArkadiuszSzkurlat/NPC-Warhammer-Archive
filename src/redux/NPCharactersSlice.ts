import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Folders, NPCInitialState } from '../types/types';

const initialState: NPCInitialState = { names: [], folders: [] };

export const NPCharactersSlice = createSlice({
  name: 'NPCharacters',
  initialState,
  reducers: {
    setNPCharacters: (
      state: NPCInitialState,
      action: PayloadAction<string[]>
    ) => {
      return { ...state, names: action.payload };
    },
    setFolders: (state: NPCInitialState, action: PayloadAction<Folders[]>) => {
      return { ...state, folders: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNPCharacters, setFolders } = NPCharactersSlice.actions;

export default NPCharactersSlice.reducer;
