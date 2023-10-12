# smtp-mail-fastify

### nodemailer 发送邮件 smtp
http://127.0.0.1:9876/api/sendEmail
```
{
    "type": "other",
    "receiver": {
        "from": "张大力<a@gmail.com>",
        "subject": "测试",
        "to": "a@qq.com",
        "html": "<h1>你好111</h1>"
    },
    "config": {
        "host": "smtp.gmail.com",
        "port": "465",
        "auth": {
            "user": "a@gmail.com",
            "pass": "密码aaa"
        }
    }
    
}

// 配置收件人信息
const receiver = {
  // 发件人 邮箱  '昵称<发件人邮箱>'
  from: `"张大力"<a@gmail.com>`,
  // 主题
  subject: "录取通知-测试",
  // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
  to: "a@qq.com",
  // 可以使用html标签
  html: `
    <h1>你好,你的摸鱼程度符合本公司要求,请尽快加入我们</h1>
  `,
};

1、全局安装插件：npm i pm2 -g
2、启动项目：pm2 start 脚本 --name 自定义名称
3、查看运行项目：pm2 ls
4、重启项目：pm2 restart 自定义名称
5、停止项目：pm2 stop 自定义名称
6、删除项目：pm2 delete 自定义名称

启动
  pm2 start app.js --name web3ServiceNode
```


