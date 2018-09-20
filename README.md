

## Build Setup

install dependencies

    npm install

serve with hot reload at localhost:8080

    npm run dev

 build for production with minification

    npm run build

 build for production and view the bundle analyzer report

    npm run build --report



###如何在 GitHub Pages 上部署 vue-cli 项目
1. 在 GitHub 上创建与本地项目同名的远程仓库
2. 将本地基于`vue-cli`的项目 `push` 到远程
  
     `$ git init` 

      `$ git add .`

      `$ git cmt -m 'create project'`

      `$ git remote add origin git@github.com:仓库名称`

     ` $ git push -u origin master`  
    
3,将 dist 下的所有文件夹 push 到 gh-pages

    $ npm run build
    $ git checkout -b gh-pages
    $ git add -f dist
    $ git commit -m 'create project'
    $ git subtree push --prefix dist origin gh-pages


4,这些步骤做完之后在 gh-pages的settings里的source设置gh-pages branch即可展示了


###**重点**

1,在 `npm run build ` 之前要将 `config/index.js` 里边 `build` 配置里边的 `assetsPublicPath: '/' 改成 assetsPublicPath: './'`

2,单页面情况下将 webpack.prod.conf.js 中的 new HtmlWebpackPlugin插件中的 removeAttributeQuotes 改为 false。

    `new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true   ===> false
      },`
3,多页面情况下将 utils.js 中的多页面输出配置minify中的 removeAttributeQuotes 改为 false。

        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false
        }


#####以上就是在 GitHub Pages 上部署 vue-cli 项目的操作啦，看到的童鞋们点个star啦。