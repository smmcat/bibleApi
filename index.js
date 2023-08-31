const express = require('express');
const cors = require('cors');
const app = express();


// 简体圣经数据 路由
const router = require('./router/index');




// 配置服务器
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

const port = 81;
app.listen(port, () => {
    console.log(`服务器运行在 http://127.0.0.1:${port}上`);
})