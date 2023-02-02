
function readPackage(pkg, context) {
  if (pkg.name === 'eslint-plugin-jsx-a11y' && pkg.version.startsWith('6.')) {
    pkg.dependencies = {
      ...pkg.dependencies,
      "language-tags": "1.0.5",
    }
  }
  if (pkg.name === '@umijs/max' && pkg.version.startsWith('4.')) {
    pkg.dependencies = {
      ...pkg.dependencies,
      "antd": "^5.1.4",
    }
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
}
