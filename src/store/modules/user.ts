import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageSession } from "@pureadmin/utils";
import { getLogin, refreshTokenApi } from "@/api/user";
import { UserResult, RefreshTokenResult } from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { type DataInfo, setToken, removeToken, sessionKey } from "@/utils/auth";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 真实姓名
    realname:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.realname ?? "",
    // 用户名
    username:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.username ?? "",
    // 页面级别权限
    isAdmin:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.isAdmin ?? true,
    // token
    _token:
      storageSession().getItem<DataInfo<number>>(sessionKey)?._token ?? "",
    // 头像
    avatar:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.avatar ?? "",
    _id: storageSession().getItem<DataInfo<number>>(sessionKey)?._id ?? ""
  }),
  actions: {
    /** 存储id */
    SET_ID(_id: string) {
      this._id = _id;
      // console.log(_id);
    },
    /** 存储真实姓名 */
    SET_REALNAME(realname: string) {
      this.realname = realname;
      // console.log("realname" + realname);
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ISADMIN(isAdmin: boolean) {
      this.isAdmin = isAdmin;
    },
    /** 存储token */
    SET_TOKEN(_token: string) {
      this._token = _token;
      // console.log(this._token);
    },
    /** 存储用户与头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar;
      // console.log(avatar);
    },
    /** 登入 */
    async loginByUsername(data) {
      /** 返回一个符合 userResult规范的 promise对象 */
      /** resolve 和 reject 试做两个参数 */
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            // console.log("code === " + data.data._token);
            if (data.code === "SUCCESS") {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      this.realname = "";
      this.avatar = "";
      this.id = "";
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("auth/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
