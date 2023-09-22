import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import token from "@/store/token/index";
/** 获取打卡时长 */
export const getAdTime = (id?: string) => {
  // console.log("token = " + token);
  return http.request("get", baseUrlApi(`duration/progress/${id}`), {
    headers: { Authorization: token }
  });
};
/** 获取打卡情况 */
export const getAdCd = (id?: string) => {
  // console.log("token = " + token);
  console.log(
    http.request("get", baseUrlApi(`attendance/weeklyAttendance/${id}`), {
      headers: { Authorization: token }
    })
  );
  return http.request("get", baseUrlApi(`attendance/weeklyAttendance/${id}`), {
    headers: { Authorization: token }
  });
};
