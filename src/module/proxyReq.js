import axios from "axios"
function proxyReq(proxyUrlObj, headersVal) {
    return function route(req, res) {
        // 获取请求方式，路径，body,query,header
        let method = req.method;
        let url = req.originalUrl;
        let body = req.body;
        let headers = req.headers;
        // console.log("====method,url,body,headers==", method, url, body, headers);

        //根据设置的代理路径，得到真正的url
        for (let path in proxyUrlObj) {
            let reg = new RegExp("^" + path);
            if (reg.test(url)) {
                url = proxyUrlObj[path] + url.replace(reg, "");
                break;
            }
        }
        // console.log("====url==", url);

        // 根据请求头过滤配置得到要向后端传递的请求头
        if (typeof headersVal == 'boolean') {
            if (!headersVal) {  //拒绝任何请求头
                headers = {};
            }
        }
        if (headersVal instanceof Array) {
            let newHeader = {};
            headersVal.forEach(name => {
                newHeader[name] = headers[name];
            });
            headers = newHeader;
        }
        // console.log("====headers==", headers);
        let option = {
            method: method,
            url: url,
            data: body,
            headers: headers
        };
        console.log("============" + req.originalUrl + " 代理请求信息==============\n", JSON.stringify(option, null, 4))
        // 发送 POST 请求
        axios(option).then(d => {
            console.log("========" + req.originalUrl + " 代理请求结果==============\n", JSON.stringify(d.data, null, 4))
            res.send(d.data);
        }).catch(function (err) {
            // console.log("============err==========", err)
            res.send({ "code": 1, message: "代理请求失败："+err.message });
        })
    }
}
// module.exports = proxyReq;
export default proxyReq
