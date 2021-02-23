module.exports = {
  assetsDir: 'assets',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "./src/style/_variables.scss";
          @import "./src/style/_mixins.scss";
        `
      }
    }
  }
}
