import { configureStore } from '@reduxjs/toolkit';
import NPCSlice from './NPCSlice';
import NPCharactersSlice from './NPCharactersSlice';

export const store = configureStore({
  reducer: {
    NPCSlice: NPCSlice,
    NPCharactersSlice: NPCharactersSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
