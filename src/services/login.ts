import { whyRequest } from "../utils/reuqest";

/**
 * 登陆请求数据类型
 */
export interface ILogin {
  userName: string;
  pwd: string;
}

/**
 * 返回数据类型
 * 要提前和后段定义好类型，等接口写完直接替换地址就好了
 *
 */
export interface ILoginData {
  code: number;
  message: string;
  token: string;
}

/**
 * 登陆接口
 * @param params
 */
export const loginApp = (params: ILogin): Promise<ILoginData> => {
  return whyRequest.get("/login", params);
};
