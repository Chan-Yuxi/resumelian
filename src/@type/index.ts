export interface UserState {
  username: string;
  token: string;
}

export interface EditorState {
  value: string;
}

export interface Theme {
  id: string;
  name: string;
  content: string;
  pic: string;
}

export interface Result<T> {
  code: number;
  data: T;
  message: string;
}

export interface LoginResponse {
  userId: string;
  token: string;
}

export interface ResumeResponse {
  id: string;
  userId: string;
  resumeName: string;
  resumeText: string;
  createTime: string;
  modifyTime: string;
  resumeTheme: string;
}
