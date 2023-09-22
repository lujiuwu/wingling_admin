import Cookies from "js-cookie";
import { storageSession } from "@pureadmin/utils";
import { useUserStoreHook } from "@/store/modules/user";

export interface DataInfo<T> {
  /** token */
  _token: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 用户名 */
  username?: string;
  /** 当前登陆用户的角色 */
  isAdmin: boolean;
  realname?: string;
  avatar?: string;
  _id: string;
}

export const sessionKey = "user-info";
export const TokenKey = "authorized-token";

/** 获取`token` */
export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageSession().getItem(sessionKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
  // data 是用户信息
  let expires = 0;
  const { _token, refreshToken } = data;
  expires = new Date(data.expires).getTime(); // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  const cookieString = JSON.stringify({ _token, expires });

  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000
      })
    : Cookies.set(TokenKey, cookieString);

  function setSessionKey(
    realname: string,
    username: string,
    isAdmin: boolean,
    _token: string,
    avatar: string,
    _id: string
  ) {
    useUserStoreHook().SET_REALNAME(realname);
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_ISADMIN(isAdmin);
    useUserStoreHook().SET_TOKEN(_token);
    useUserStoreHook().SET_AVATAR(avatar);
    useUserStoreHook().SET_ID(_id);
    storageSession().setItem(sessionKey, {
      refreshToken,
      expires,
      username,
      realname,
      isAdmin,
      _token,
      avatar,
      _id
    });
  }

  if (
    data.username &&
    data.isAdmin &&
    data._token &&
    data.realname &&
    data.avatar &&
    data._id
  ) {
    setSessionKey(
      data.realname,
      data.username,
      data.isAdmin,
      data._token,
      data.avatar,
      data._id
    );
  } else {
    const avatar =
      storageSession().getItem<DataInfo<number>>(sessionKey)?.avatar ?? "";
    const realname =
      storageSession().getItem<DataInfo<number>>(sessionKey)?.realname ?? "";
    const username =
      storageSession().getItem<DataInfo<number>>(sessionKey)?.username ?? "";
    const isAdmin =
      storageSession().getItem<DataInfo<number>>(sessionKey)?.isAdmin ?? true;
    const _token =
      storageSession().getItem<DataInfo<number>>(sessionKey)?._token ?? "";
    const _id =
      storageSession().getItem<DataInfo<number>>(sessionKey)?._id ?? "";
    setSessionKey(realname, username, isAdmin, _token, avatar, _id);
  }
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  Cookies.remove(TokenKey);
  sessionStorage.clear();
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return token;
};
