import React from "react";
import PromiseRender from "./PromiseRender";

export type IAuthorityType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  | ((permissions: string[]) => boolean | Promise<boolean>);

/**
 * 通用权限检查方法
 * @param authority - 按钮权限判定
 * @param permissions - 当前权限
 * @param target - 通过的组件
 * @param Exception - 未通过的组件
 */
const checkPermissions = <T, K>(
  authority: IAuthorityType,
  permissions: string[] = [],
  target: T,
  Exception: K
): T | K | React.ReactNode => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (permissions.some((item) => authority.includes(item))) {
      return target;
    }
    if (
      permissions.length > 0 &&
      permissions.every((item) => authority.includes(item))
    ) {
      return target;
    }
    return Exception;
  }
  // string 处理
  if (typeof authority === "string") {
    if (permissions.some((item) => authority === item)) {
      return target;
    }
    return Exception;
  }
  // Promise 处理
  if (authority instanceof Promise) {
    return (
      <PromiseRender<T, K> ok={target} error={Exception} promise={authority} />
    );
  }
  // Function 处理
  if (typeof authority === "function") {
    const promise = authority(permissions);
    // 函数执行后返回值是 Promise
    if ((promise as Promise<boolean>) instanceof Promise) {
      return (
        <PromiseRender<T, K>
          ok={target}
          error={Exception}
          promise={promise as Promise<boolean>}
        />
      );
    }
    if (promise) {
      return target;
    }
    return Exception;
  }
  throw new Error("Unsupported parameters");
};

export default checkPermissions;
