import type { UserState } from "@/@type/definition";
import type { PayloadAction as P } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  username: "tourist",
  token: "",
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
  },
});

export const { setUsername, setToken } = userSlice.actions;
export default userSlice.reducer;
