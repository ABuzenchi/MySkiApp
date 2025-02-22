import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PreferencesState {
  language: string;
}

const initialState: PreferencesState = {
  language: "english",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const {setLanguage} = preferencesSlice.actions;
export default preferencesSlice.reducer;
