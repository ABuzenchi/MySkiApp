import { createSlice } from "@reduxjs/toolkit";
interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  profilePicture: string | null;
  favoriteSlopes: string[];
  visitedSlopes: string[];
}

const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
  profilePicture: null,
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
      state.profilePicture = action.payload.avatar || null;
    },
    logout(state) {
      state.username = null;
      state.isAuthenticated = false;
      state.profilePicture = null;
    },
    setAvatar(state, action) {
      state.profilePicture = action.payload;
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
