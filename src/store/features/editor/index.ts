import type { PayloadAction as P } from "@reduxjs/toolkit";
import type { EditorState } from "@/@type";

import { createSlice } from "@reduxjs/toolkit";

const initialState: EditorState = {
  value: "",
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    saveValue(state, { payload }: P<string>) {
      state.value = payload;
    },
  },
});

export const { saveValue } = editorSlice.actions;
export default editorSlice.reducer;
