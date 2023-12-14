export interface UserState {
  username: string;
  token: string;
}

export interface EditorState {
  value: string;
}

export interface Result<T> {
  code: number;
  data: T;
  message: string;
}
