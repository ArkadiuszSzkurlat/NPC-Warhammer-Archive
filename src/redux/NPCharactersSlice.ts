import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = { names: [] };

export const NPCharactersSlice = createSlice({
  name: 'NPCharacters',
  initialState,
  reducers: {
    setNPCharacters: (state: any, action: PayloadAction<any>) => {
      return { ...state, names: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNPCharacters } = NPCharactersSlice.actions;

export default NPCharactersSlice.reducer;
