const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/zhihu', {
            target: 'https://www.zhihu.com',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/zhihu': '',
            }
        })
    );
}
