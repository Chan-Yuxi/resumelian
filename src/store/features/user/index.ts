import type { UserState } from "@/type/definition";
import type { PayloadAction as P } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  name: "",
  username: "tourist",
  token: "",
  userId: "",
  aiNumber: 0,
  age: 0,
  sex: "",
  email: "",
  phone: 0,
  university: "",
  speciality: "",
  intention: "",
  openId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, { payload }: P<string>) {
      state.username = payload;
    },
    setToken(state, { payload }: P<string>) {
      state.token = payload;
    },
    setUser(state, { payload }: P<UserState>) {
      Object.assign(state, payload);
    },
  },
});

export const { setUsername, setToken } = userSlice.actions;
export default userSlice.reducer;
