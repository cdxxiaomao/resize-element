# base-vite-vue-ts-eslint-husky

#### 介绍
Vue3项目基础环境

软件架构

* [Vite](https://cn.vitejs.dev/)
* [Typescript](https://webpack.docschina.org/)
* [Less](https://lesscss.org/)
* [Eslint](https://eslint.org/)
* [Husky](https://typicode.github.io/husky/)


#### 安装教程

1. 安装依赖

   ```sh
   # npm
   npm install
   ```

   推荐pnpm

   ```sh
   pnpm install
   ```

2. 运行

   ```sh
   npm run serve
   ```

3. 打包项目

   ```sh
   npm run build
   ```

#### 注意事项

1. 因为使用了husky验证，在提交不上的情况下，一般注意以下原因：
   1. 提交描述不正确，注意比如: "feat: 新增项目管理模块"，"feat: "冒号后面需要有一个半角空格。
   2. eslint验证不通过，可先在对应的提交文件，使用eslint修复文件再提交。
