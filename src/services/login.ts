import { whyRequest } from '@/utils/reuqest';

/**
 * 登录请求数据类型
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * 返回数据类型
 * 要提前和后段定义好类型，等接口写完直接替换地址就好了
 *
 */
export interface LoginResult {
  code: number;
  message: string;
  token: string;
}

/**
 * 登录接口
 * @param params
 */
export const loginApp = (params: LoginParams): Promise<LoginResult> => {
  return whyRequest.get('/login', params);
};
