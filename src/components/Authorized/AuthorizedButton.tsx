import React, { useEffect, useState } from "react";
import type { IAuthorityType } from "./checkPermissions";
import checkPermissions from "./checkPermissions";

interface AuthorizedProps {
  // 权限判定
  authority: IAuthorityType;
  // render
  render?: () => React.ReactNode;
  // 未匹配结果
  noMatch?: React.ReactNode;
  // children
  children?: React.ReactNode;
}

/**
 * 按钮权限判定
 */
function AuthorizedButton({
  children,
  authority,
  render,
  noMatch,
}: AuthorizedProps) {
  // 目前是写死的按钮权限，真实场景应该会有配置页面，通过接口返回对应权限，然后放到permission中
  const [permissions] = useState<string[]>(["button", "button1", "button2"]);

  const result = checkPermissions(
    authority,
    // state?.userInfo!.userResourceMap[state.enterpriseId],
    permissions,
    render ? render() : children,
    noMatch
  );
  return <>{result}</>;
}

export default React.memo(AuthorizedButton);
