export interface User {
  name: string;
  username: string;
  userId: string;
  aiNumber: number;
  age: number;
  sex: string;
  email: string;
  phone: number;
  university: string;
  speciality: string;
  intention: string;
  openId: string;
}

export interface UserState extends User {
  username: string;
  token: string;
}

export interface EditorState {
  value: string;
}

export interface Template {
  id: number;
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

  default: string;
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

export interface Resume {
  id: string;
  userId?: string;
  name: string;
  text: string;
  createTime?: string;
  modifyTime?: string;
  theme: string;
  customTheme: string;
}

export interface ConsumptionRecord {
  id: string;
  title: string;
  mchid: string;
  appid: string;
  out_trade_no: string;
  transaction_id: string;
  trade_type: string;
  trade_state: string;
  bank_type: string;
  attach: string;
  subject: string;
  success_time: string;
  open_id: string;
  money: number;
  totalAmount: number;
  user_id: string;
  traceNo: string;
  aliPayment: string;
}

export interface Trade {
  id: string;
  tradeName: string;
  tradeDetails: string;
  price: number;
  monthlySales: number;
  pic: string;
  alreadyBuy: boolean;
  netdisk: string;
}

export interface Course {
  courseId: number;
  courseName: string;
  courseIntroduction: string;
  originalPrice: number;
  discountedPrice: number;
  createTime: string;
  modifyTime: string;
  subscribe: number;
  sort: string;
  pic: string;
}

export interface CourseChapter {
  courseId: number;
  chapterId: number;
  chapterOrder: number;
  chapterName: string;
  createTime: string;
  study: number;
  sorts: string;
  route: string;
}
