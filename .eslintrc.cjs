module.exports = {
  extends: [require.resolve('@micro-web/standard/eslint.cjs')],
  rules: {
    'no-param-reassign': [2, { props: true, ignorePropertyModificationsFor: ['draft'] }],
  },
};
