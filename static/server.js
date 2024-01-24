const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// 定义GET请求的路由
app.get('/user/info', (req, res) => {
  console.log(req.body);
  res.setHeader('Content-Type', 'text/plain;charset=utf8');
  res.send({
      code: 20000,
      data: {
          avatar: 'avstar',
          name: 'name',
          roles: ['000', '111', '222'],
          token: '3213232edcnjcnskncjsnkqjnjcndijc'
      },
      msg: 'success',
      success: true
  });
});

app.post('/user/login', (req, res) => {
    console.log(req.body);
    res.setHeader('Content-Type', 'text/plain;charset=utf8');
    res.send({
        code: 20000,
        data: {
            username: req.body.username,
            token: '3213232edcnjcnskncjsnkqjnjcndijc'
        },
        msg: 'success',
        success: true
    });
  });

// 定义POST请求的路由
app.post('/user/logout', (req, res) => {
  console.log(req.body);
  res.setHeader('Content-Type', 'text/plain;charset=utf8');
  res.send({
      code: 20000,
      msg: 'success',
      success: true
  });
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
