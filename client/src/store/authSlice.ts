import { createSlice } from "@reduxjs/toolkit";
import { updateSlopes } from "./updateSlopes";
import { getUserByUsername } from "./getUserByUsername";

interface AuthState {
  id:string|null;
  username: string | null;
  isAuthenticated: boolean;
  profilePicture: string | null;
  favoriteSlopes: string[];
  visitedSlopes: string[];
}

const initialState: AuthState = {
  id:null,
  username: null,
  isAuthenticated: false,
  profilePicture: null,
  favoriteSlopes: [],
  visitedSlopes: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.id = action.payload.id || null;
      state.username = action.payload.username;
      state.isAuthenticated = true;
      state.profilePicture = action.payload.avatar || null;
    },
    logout(state) {
      state.id = null;
      state.username = null;
      state.isAuthenticated = false;
      state.profilePicture = null;
      state.favoriteSlopes = [];
      state.visitedSlopes = [];
    },
    setAvatar(state, action) {
      state.profilePicture = action.payload;
    },
    addFavoriteSlopes(state, action) {
      state.favoriteSlopes.push(action.payload);
    },
    addVisitedSlopes(state, action) {
      state.visitedSlopes.push(action.payload);
    },
    removeFavoriteSlope(state, action) {
      state.favoriteSlopes = state.favoriteSlopes.filter(
        (slope) => slope !== action.payload
      );
    },
    setUsername(state, action) {
      state.username = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateSlopes.fulfilled, (state, action) => {
      state.favoriteSlopes = action.payload.favoriteSlopes || [];
      state.visitedSlopes = action.payload.visitedSlopes || [];
    });
    builder.addCase(getUserByUsername.fulfilled, (state, action) => {
      state.id = action.payload._id || null;
      state.username = action.payload.username;
      state.profilePicture = action.payload.profilePicture || null;
      state.favoriteSlopes = action.payload.favoriteSlopes || [];
      state.visitedSlopes = action.payload.visitedSlopes || [];
      state.isAuthenticated = true;
    });
  },
});

export const {
  login,
  logout,
  setAvatar,
  addFavoriteSlopes,
  addVisitedSlopes,
  removeFavoriteSlope,
  setUsername
} = authSlice.actions;

export default authSlice.reducer;
