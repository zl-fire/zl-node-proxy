# zl-node-proxy
使用node开发的一个请求代理模块

## 安装模块
```js
 npm i zl-node-proxy -D
```

## 使用此代理模块（以react项目为例）

此模块开发目的：为了在已经启用脚手架中的代理模块的基础上，在创建另一个更加定制化的代理跨域服务而开发的第三方模块

说明：
  1. 由于此代理服务端口和react页面服务**不是**同一个端口，所以不会和react项目中已经开启的代理服务进行冲突，即可以两个代理服务共用。
  2. 如果只想使用本模块作为代理跨域服务也可以的，本模块会完整的转发你在页面产生的所有跨域请求

**使用流程**
1. 在react项目根目录创建配置文件 zl_node_proxy.config.js
 ![bb](/assets/bb.png)
```js
let createProxyServe = require("zl-node-proxy");
//构造代理请求服务器
createProxyServe({
    port: 3125, //代理服务的端口，默认3123,如果你电脑的当前端口已经被占用，那么可以手动更换电脑端口
    proxyUrlObj: {// 两个代理地址
        "/proxyUrl1": "http://xxxxxxxxxxxx.cn",
        "/proxyUrl2": "http://baidu.com",
    },
    headers: ["content-type"],//表示只允许转发content-type请求头
});
// headers参数说明：headers也可以为Boolean类型，为true表示转发所有的请求头，为false表示不转发任何请求头

```

2. 在react项目的package.json中的start脚本命令中追加命令：node ./zl_node_proxy.config.js
   ![cc](/assets/cc.png)
```js
如：
原本的start命令：  "start": "react-scripts start",
修改后的start命令："start": "react-scripts start | node ./zl_node_proxy.config.js",
```
3. 在项目中使用此代理服务，具体两点
     1. 在react项目的入口文件中向React对象添加代理地址变量,如下
      ![dd](/assets/dd.png)
      ```js
         /* 
          设置了两个代理地址
          注意：
           1. 下面的端口需要和代理地址的端口保持一致 
           2. 下面的代理地址 proxyUrl1，proxyUrl2等，应该和zl_node_proxy.config.js配置文件中设置的是一致的，否则会对不上
           3. 如果你想让局域网的其他电脑访问你的页面，请把下面的127.0.0.1换成你电脑在的真正IP地址
         */
          React.$proxyUrl1="http://127.0.0.1:3125/proxyUrl1";
          React.$proxyUrl2="http://127.0.0.1:3125/proxyUrl2";
      ```
      1. 在具体组件中使用这个代理，如下
        ![66](/assets/66.png)
      ```js
      请求示例：
              var url = React.$proxyUrl1 + '/problems/tags/all';
              axios.get(url).then(d => console.log(d.data));
            }}> /problems/tags/all 

      具体组件示例：

      import React from 'react';
      import axios from 'axios';
      import logo from './logo.svg';
      import './App.css';
      
      function App() {
        return (
          <div className="App">
            <button onClick={() => {
              var url = React.$proxyUrl1 + '/problems/tags/all';
              axios.get(url).then(d => console.log(d.data));
            }}> /problems/tags/all 
          </button>
      
            <br />
      
            <button onClick={() => {
              var url = React.$proxyUrl1 + '/problems';
              var data = {
                "title": "测试12",
                "difficulty": "SIMPLE",
                "topicTags": [
                  "栈",
                  "数组"
                ],
                "codeSnippets": [
                  {
                    "lang": "C++",
                    "code": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n * int val;\n * ListNode *next;\n * ListNode() : val(0), next(nullptr) {}\n * ListNode(int x) : val(x), next(nullptr) {}\n * ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n\n }\n};"
                  },
                  {
                    "lang": "Java",
                    "code": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n * int val;\n * ListNode next;\n * ListNode() {}\n * ListNode(int val) { this.val = val; }\n * ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n\n }\n}"
                  }
                ],
                "description": "<p>hello</p>"
              };
              axios.post(url, {
                data: data
              }).then(d => console.log(d.data));
            }}>  /problems</button>
      
            <br />

    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


          </div>
        );
      }
      
      export default App;
      
      ```

4.  启动服务 ：npm run start

5. 运行测试
   ![aa](/assets/aa.png)

6. 代理请求日志（当正式请求时，会自动将代理的实际请求和相关结果在控制台打印出来）
![77](/assets/77.png)

   
