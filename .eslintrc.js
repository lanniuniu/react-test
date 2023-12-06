// http://eslint.org/docs/user-guide/configuring

module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
  
   //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: 'babel-eslint',
  
   //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
  
  // 设置 script(默认) 或 module，如果代码是在ECMASCRIPT中的模块
      sourceType: 'module',
      "ecmaVersion": 6,
    },
  
  // 此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
      browser: true,
    },
  
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    extends: 'airbnb-base',
  
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
    // required to lint *.vue files
    plugins: [
      'html'
    ],
  
    // check if imports actually resolve
    'settings': {
      'import/resolver': {
        'webpack': {
          'config': 'build/webpack.base.conf.js'
        }
      }
    },
  
    // add your custom rules here
    'rules': {
      // don't require .vue extension when importing
      'import/extensions': ['error', 'always', {  // 对文件扩展名的验证
        'js': 'never',
        'vue': 'never'
      }],
      // allow optionalDependencies
      'import/no-extraneous-dependencies': ['error', {
        'optionalDependencies': ['test/unit/index.js']
      }],
      'no-unused-expressions': ["error", {   // 禁止无用的表达式
        "allowTernary": true,
        "allowShortCircuit": true
      }],
      'no-bitwise': ["error", {   //不允许使用位运算符
        "allow": ["~"]
      }],
      'import/prefer-default-export': 0,// 关闭-使用default export
      'import/newline-after-import': 0, // 关闭-在import中新起一行
      'no-param-reassign': 0,  //关闭-不允许重新分配函数参数"no-proto
      'no-plusplus': 0,  //关闭-不允许使用++ --运算符
      'linebreak-style': 0,
      'max-len': 0,  //关闭-一行最大长度，单位为字符
      'no-nested-ternary': 0,  //关闭-不允许使用嵌套的三目运算符
      'camelcase': 0,  // 不强制驼峰命名规则
      // allow debugger & console during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
    }
  }