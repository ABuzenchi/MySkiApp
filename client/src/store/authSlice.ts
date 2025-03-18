import { createSlice } from "@reduxjs/toolkit";
interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  avatar: string | null;
  favoriteSlopes: string[];
  visitedSlopes: string[];
}

const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
  avatar: null,
  favoriteSlopes:[],
  visitedSlopes:[],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.username = action.payload.username;
      state.isAuthenticated = true;
      state.avatar = action.payload.avatar || null;
    },
    logout(state) {
      state.username = null;
      state.isAuthenticated = false;
      state.avatar = null;
    },
    setAvatar(state, action) {
      state.avatar = action.payload;
    },
    addFavoriteSlopes(state,action){
      state.favoriteSlopes.push(action.payload);
    },
    addVisitedSlopes(state, action){
      state.visitedSlopes.push(action.payload);
    },
    removeFavoriteSlope(state,action){
      state.favoriteSlopes=state.favoriteSlopes.filter((slope)=>slope!==action.payload);
    }
    
  },
});

export const { login, logout, setAvatar,addFavoriteSlopes,addVisitedSlopes,removeFavoriteSlope } = authSlice.actions;
export default authSlice.reducer;
