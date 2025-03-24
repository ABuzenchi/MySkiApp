import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserByUsername = createAsyncThunk(
  'auth/getUserByUsername',
  async (username: string, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const user = await response.json();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
