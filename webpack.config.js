module.exports = function (env = 'prod') {
  return require(`./webpack.${env}.js`);
};
