/**
 * @function createProxyServe
 * @description 用于构造代理请求的模块
 * @param {object} params 参数对象
 * @param {object} params.port 代理服务的端口,默认 3213
 * @param {object} params.proxyUrlObj 代理地址，可配置多个，对象的每个键值对代表一个代理请求(注意：由于地址是使用的正则匹配，不同的代理地址请不要有包含关系)
 * @param {array|boolean} params.headers 当headers为数组时，代表实际转发给后端的请求头信息 | 当headers为布尔值类型时：true 代表转发所有的请求头，false 代表转发所有的请求头都进行转发
 * @example
 *
 * //构造代理请求服务器
 * createProxyServe({
 *     port: 3333, //代理服务的端口
 *     proxyUrlObj: {// 设置两个代理地址
 *         "/api1": "http://xxxxxxxxxxxx.cn",
 *         "/api2": "http://baidu.com",
 *     },
 *     headers: ["content-type"],// 允许通过的请求头
 * });
 * // headers参数说明：headers也可以为Boolean类型，为true表示转发所有的请求头，为false表示不转发任何请求头
 *
 */
declare function _exports({ port, proxyUrlObj, headers }: {
    port: object;
    proxyUrlObj: object;
    headers: any[] | boolean;
}): void;
export = _exports;
