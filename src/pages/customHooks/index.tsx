import Icon from "../../components/Icon";
import React, { useState } from "react";
import styles from "./index.module.less";

const CustomPage: React.FC = ({ children }) => {
  return (
    <div>
      我是自定义hooks
      <Icon style={{ color: "red", fontSize: "20px" }} type="icon-fanhui" />
    </div>
  );
};

export default CustomPage;
