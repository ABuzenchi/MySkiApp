// src/store/updateSlopes.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateSlopes = createAsyncThunk(
  'auth/updateSlopes',
  async (
    {
      username,
      favoriteSlopes,
      visitedSlopes
    }: {
      username: string;
      favoriteSlopes: string[];
      visitedSlopes: string[];
    },
    thunkAPI
  ) => {
    console.log("Sending to backend:", {
      username,
      favoriteSlopes,
      visitedSlopes,
    });

    try {
      const response = await fetch(`http://localhost:3000/auth/${username}/slopes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favoriteSlopes,
          visitedSlopes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update slopes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Thunk error:", error);
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
