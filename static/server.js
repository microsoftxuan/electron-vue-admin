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
  const users = [
    {
      username: 'admin',
      password: '000000'
    },
    {
      username: 'test',
      password: '111111'
    },
    {
      username: 'prod',
      password: '222222'
    }
  ]
  if (users.find(e => e.username === req.body.username && e.password === req.body.password)) {
    res.send({
      code: 20000,
      data: {
        username: req.body.username,
        token: '3213232edcnjcnskncjsnkqjnjcndijc' + '#' + new Date().getTime()
      },
      msg: 'success',
      success: true
    });
  } else {
    res.send({
      code: 201,
      msg: 'error',
      success: false
    });
  }
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
