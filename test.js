let createProxyServe = require("./index.js");

//构造代理请求服务器
createProxyServe({
    port: 3333, //代理服务的端口
    proxyUrlObj: {// 两个代理地址
        "/api1": "http://xxxxxxxxxxxx.cn",
        "/api2": "http://baidu.com",
    },
    headers: ["content-type"],//表示只允许转发content-type请求头
});
// headers参数说明：headers也可以为Boolean类型，为true表示转发所有的请求头，为false表示不转发任何请求头
