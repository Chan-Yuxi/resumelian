import type { UserState } from "@/@type/entry";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  username: "tourist",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, { payload }: PayloadAction<string>) {
      state.username = payload;
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
