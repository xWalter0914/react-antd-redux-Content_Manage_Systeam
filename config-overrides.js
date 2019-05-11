const { override, fixBabelImports, addLessLoader } = require('customize-cra');

//按需加载
 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   addLessLoader({
   javascriptEnabled: true,
   modifyVars: { '@primary-color': '#1890ff' },//修改主题
 }),
 );