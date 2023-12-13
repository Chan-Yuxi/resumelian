import type { PayloadAction as P } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

type EditorState = {
  value: string;
};

const initialState: EditorState = {
  value: "你好你好",
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
