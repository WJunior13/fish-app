module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions.modules = [
          {
            preTransformNode(astEl) {
              if (process.env.NODE_ENV === 'production') {
                const { attrsMap, attrsList } = astEl;
                if (attrsMap['data-test']) {
                  delete attrsMap['data-test'];
                  const index = attrsList.findIndex(x => x.name === 'idid');
                  attrsList.splice(index, 1);
                }
              }
              return astEl;
            },
          },
        ];
        return options;
      });
  },

  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },

  // publicPath: '', // Somente para 'serve ./dist'  no "localhost"
  publicPath: '',
};
