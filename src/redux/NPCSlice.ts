import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NPCArchetype } from '../types/types';

const initialState: NPCArchetype = {
  folder: 'main',
  name: '',
  race: '',
  class: '',
  status: '',
  age: 0,
  height: 0,
  stats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  skills: [],
  talents: [],
  items: [],
  description: '',
};

export const NPCSlice = createSlice({
  name: 'NPCSlice',
  initialState,
  reducers: {
    changeNPCStats: (
      state: NPCArchetype,
      action: PayloadAction<NPCArchetype>
    ) => {
      state.name = action.payload.name;
      state.race = action.payload.race;
      state.class = action.payload.class;
      state.status = action.payload.status;
      state.age = action.payload.age;
      state.height = action.payload.height;
      state.stats = action.payload.stats;
      state.skills = action.payload.skills;
      state.talents = action.payload.talents;
      state.items = action.payload.items;
      state.description = action.payload.description;
    },
    changeNPCDirectory: (
      state: NPCArchetype,
      action: PayloadAction<string>
    ) => {
      state.folder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeNPCStats, changeNPCDirectory } = NPCSlice.actions;

export default NPCSlice.reducer;
