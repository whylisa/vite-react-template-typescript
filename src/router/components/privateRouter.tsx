import React, { FC } from "react";
import { Route, useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import { RouteProps } from "react-router";

const PrivateRoute: FC<RouteProps> = (props) => {
  const logged = sessionStorage.getItem("token");
  const history = useHistory();

  return logged ? (
    <Route {...props} />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={"无权限"}
      extra={
        <Button type="primary" onClick={() => history.push("/login")}>
          跳转到登陆
        </Button>
      }
    />
  );
};

export default PrivateRoute;
