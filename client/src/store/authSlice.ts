import { createSlice } from "@reduxjs/toolkit";
interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  avatar:string| null;
}

const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
  avatar:null
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
      state.avatar=null;
    },
    setAvatar(state, action) {
      state.avatar = action.payload; 
    },
  },
});

export const { login, logout, setAvatar } = authSlice.actions;
export default authSlice.reducer;
