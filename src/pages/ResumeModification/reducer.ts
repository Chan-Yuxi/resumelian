import type { Theme } from "@/type/definition";

const SETUP_THEME = "SETUP_THEME";
const UPDATE_COLORS = "UPDATE_COLORS";
const UPDATE_GUTTER = "UPDATE_GUTTER";
const UPDATE_FAMILY = "UPDATE_FAMILY";
const TOGGLE_AVATAR = "TOGGLE_AVATAR";
const UPDATE_AVATAR_POSITION = "UPDATE_AVATAR_POSITION";

const initialTheme: Theme = {
  name: "default",
  style: "",
  colors: [],
  enableAvatar: false,
  avatarPosition: {
    x: 25,
    y: 25,
  },
  gutter: "1rem",
  family: "Arial",
};

function setupTheme(theme: Theme) {
  return {
    type: SETUP_THEME,
    payload: theme,
  };
}

function updateColors(colors: string[]) {
  return {
    type: UPDATE_COLORS,
    payload: colors,
  };
}

function updateGutter(gutter: string) {
  return {
    type: UPDATE_GUTTER,
    payload: gutter,
  };
}

function updateFamily(family: string) {
  return {
    type: UPDATE_FAMILY,
    payload: family,
  };
}

function toggleAvatar() {
  return {
    type: TOGGLE_AVATAR,
    payload: null,
  };
}

function updateAvatarPosition({ x, y }: { x: number; y: number }) {
  return {
    type: UPDATE_AVATAR_POSITION,
    payload: { x, y },
  };
}

function reducer(state: Theme, action: { type: string; payload: any }): Theme {
  switch (action.type) {
    case SETUP_THEME:
      return action.payload as Theme;
    case UPDATE_COLORS:
      return { ...state, colors: action.payload as string[] };
    case UPDATE_GUTTER:
      return { ...state, gutter: action.payload as string };
    case UPDATE_FAMILY:
      return { ...state, family: action.payload as string };
    case TOGGLE_AVATAR:
      return { ...state, enableAvatar: !state.enableAvatar };
    case UPDATE_AVATAR_POSITION:
      return {
        ...state,
        avatarPosition: action.payload as { x: number; y: number },
      };
    default:
      return state;
  }
}

export {
  reducer,
  initialTheme,
  setupTheme,
  updateColors,
  updateFamily,
  updateGutter,
  toggleAvatar,
  updateAvatarPosition,
};
