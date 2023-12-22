import http from "@/utils/http";
import { getItem } from "@/utils/storage";
import axios from "axios";

/**
 * 获取主题列表
 *
 * @returns
 */
export const getAllTheme = () => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }

  return http.request({
    url: `home/getrusumetheme?userId=${username}`,
    method: "get",
  });
};

// /**
//  * 获取主题图片
//  *
//  * @param pictureId 图片艾低
//  * @returns
//  */
// export const getThemePicture = (pictureId: string) => {
//   const username = getItem("username");
//   if (!username) {
//     return Promise.resolve(null);
//   }

//   return http.request({
//     url: `/home/getrusumethemepic2?userId=${username}&id=${pictureId}`,
//     method: "get",
//   });
// };

export const getThemePicture = (pictureId: string) => {
  const username = getItem("username");
  const token = getItem("token");

  if (!username || !token) {
    return Promise.resolve(null);
  }

  console.log(username);
  return axios.get(
    `/api/home/getrusumethemepic2?userId=${username}&id=${pictureId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
