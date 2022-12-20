function readPackage(pkg, context) {
  if (pkg.name === 'eslint-plugin-jsx-a11y' && pkg.version.startsWith('6.6.1')) {
    pkg.dependencies = {
      ...pkg.dependencies,
      "language-tags": "1.0.5",
    }
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
}
