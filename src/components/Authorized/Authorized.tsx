import React from "react";
import { Result } from "antd";
import checkPermissions, { IAuthorityType } from "./checkPermissions";

interface AuthorizedProps {
  // 权限判定
  authority: IAuthorityType;
  // 条件 OR | undefined，默认 AND
  term?: "OR";
  // render
  render?: () => React.ReactNode;
  // 未匹配结果
  noMatch?: React.ReactNode;
  // children
  children: React.ReactNode;
}

/**
 * 通用权限判定
 */
function Authorized({
  children,
  authority,
  term,
  render,
  noMatch,
}: AuthorizedProps) {
  const { permissions } = { permissions: [] };

  const result = checkPermissions(
    authority,
    permissions,
    term,
    render ? render() : children,
    noMatch || <Result status={403} title="403" subTitle={"无权限"} />
  );

  return <>{result}</>;
}

export default Authorized;
