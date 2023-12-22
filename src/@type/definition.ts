export interface UserState {
  username: string;
  token: string;
}

export interface EditorState {
  value: string;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  pic: string;
  default: string;
}

/**
 * 主题是简历的修饰对象，包含一张简历需要的样式
 *
 * 名称，保留
 * 颜色，颜色是不定长数组，每个元素都是一个 Hex-value，在 style 中引用时使用 var(--color-[index])
 * 字体，默认字体
 * 间距，通用间距，var(--getter)
 * 样式，简历 Css 修饰内容
 *
 */
export interface Theme {
  style: string;
  name: string;
  colors: string[];
  enableAvatar: boolean;
  avatarPosition: { x: number; y: number };
  family: string;
  gutter: string;
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
  customTheme: string;
}
