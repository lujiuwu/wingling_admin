import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import token from "@/store/token/index";
// 补卡操作
export const getBukaInfo = (data?: object) => {
  // console.log("token = " + token);
  return http.request("get", baseUrlApi("makeupClock/get"), {
    headers: { Authorization: token }
  });
};
// 补卡处理
export const handleBuka = (data?: object, id?: string) => {
  // console.log(
  //   "reason",
  //   http.request("put", baseUrlApi(`makeupClock/update/${id}`), {
  //     headers: { Authorization: token },
  //     data
  //   })
  // );
  http.request("put", baseUrlApi(`makeupClock/update/${id}`), {
    headers: { Authorization: token },
    data
  });
};
// 删除补卡
export const DeleteBuka = (id?: string) => {
  http.request("delete", baseUrlApi(`makeupClock/delete/${id}`), {
    headers: { Authorization: token }
  });
};
