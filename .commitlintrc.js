const Configuration = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'header-max-length': [0], // level: disabled
    // "function-rules/header-max-length": [
    //   2, // level: error
    //   "always",
    //   (parsed) => {
    //     if (/^\[[A-Za-z]{1,}-[0-9]{1,6}\]\s[\S\s{0,1}]{1,}$/.test(parsed.header)) {
    //       return [true];
    //     }
    //     return [false, 'please enter commit message correctly, like: "[PAASA-4305] commit lint"'];
    //   },
    // ],
    'subject-empty': [0, 'never'],
    'type-empty': [0, 'never'],
  },
};

module.exports = Configuration;
