import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import token from "@/store/token/index";
// 用户信息

// type Result = {
//   success: boolean;
//   data?: {
//     /** 列表数据 */
//     data: Array<any>;
//     /** 总条目数 */
//     total?: number;
//     /** 每页显示条目个数 */
//     pageSize?: number;
//     /** 当前页数 */
//     currentPage?: number;
//   };
// };
// 获取用户信息
/** 获取用户管理列表 */
export const getUserList = (data?: object) => {
  // console.log("token = " + token);
  return http.request("get", baseUrlApi("user/getUsers"), {
    headers: { Authorization: token },
    data
  });
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request("get", baseUrlApi("user/getUsers"), {
    headers: { Authorization: token },
    data
  });
};
/** 删除用户 需要 token*/
export const deleteUser = (data?: object) => {
  // 通过 _id 删除
  http.request("delete", baseUrlApi(`user/delete/${data}`), {
    headers: { Authorization: token }
  });
};

/** 新增用户 */
export const addUser = (data?: object) => {
  return http.request("post", baseUrlApi("user/create"), {
    headers: { Authorization: token },
    data
  });
};
/** 更新用户信息 */
export const updateInfo = (data?: object, id?: string) => {
  console.log(
    http.request("post", baseUrlApi(`user/edit/${id}`), {
      headers: { Authorization: token },
      data
    })
  );
  http.request("post", baseUrlApi(`user/edit/${id}`), {
    headers: { Authorization: token },
    data
  });
};
