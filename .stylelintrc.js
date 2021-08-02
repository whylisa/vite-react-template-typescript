module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    // 颜色值小写
    "color-hex-case": "lower",
    // 注释前无须空行
    "comment-empty-line-before": "never",
    // 使用数字或命名的 (可能的情况下) font-weight 值
    "font-weight-notation": null,
    // 在函数的逗号之后要求有一个换行符或禁止有空白
    "function-comma-newline-after": null,
    // 在函数的括号内要求有一个换行符或禁止有空白
    "function-parentheses-newline-inside": null,
    // url使用引号
    "function-url-quotes": "always",
    // 字符串使用单引号
    "string-quotes": "single",
    // 禁止低优先级的选择器出现在高优先级的选择器之后
    "no-descending-specificity": null,
    // 禁止空源
    "no-empty-source": null,
    // 禁止缺少文件末尾的换行符
    "no-missing-end-of-source-newline": null,
  },
};
