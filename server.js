// Require the framework and instantiate it
// const fastify = require("fastify")({ logger: true });
const fastify = require("fastify")({ logger: false });

const nodemailer = require("nodemailer");
const Joi = require("joi");

// process.env.NODE_ENV !== "development"
if (true) {
  // process是Node环境全部变量, 运行时根据敲击的命令不同, 脚手架会取环境变量给env添加属性和值
  console.log = function () {};
  console.error = function () {};
  console.dir = function () {};
}

const config_default = {
  // 配置服务商提供的发送服务器和端口号
  host: "smtp.gmail.com",
  port: "465",
  auth: {
    // 发件人邮箱账号
    user: "aaa@gmail.com",
    //发件人邮箱的授权码 需要在自己的邮箱设置中生成,并不是邮件的登录密码
    pass: "aaa",
  },
};
const transporter = nodemailer.createTransport(config_default);

// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.post("/api/sendEmail", async (request, reply) => {
  const bodyData = request.body;
  console.log("参数", bodyData);

  const authSchema = Joi.object({
    user: Joi.string().required(),
    pass: Joi.string().required(),
  });

  const configSchema = Joi.object({
    host: Joi.string().required(),
    port: Joi.string().required(),
    auth: authSchema.required(),
  });

  const receiverSchema = Joi.object({
    from: Joi.string().required(), // 发件人 邮箱  '昵称<发件人邮箱>'
    subject: Joi.string().required(), // 主题
    to: Joi.string().required(), // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
    html: Joi.string().required(), // 可以使用html标签
  });
  const schema = Joi.object({
    type: Joi.string().required(), // default  other
    receiver: receiverSchema.required(),
    config: configSchema,
  });

  let transporterNew = transporter;

  const { error } = schema.validate(bodyData);
  if (error) return error;

  if (bodyData.type === "default") {
    // 默认配置
    transporterNew = transporter;
  } else if (bodyData.type === "other") {
    // 其他配置 传入
    if (!bodyData.config) {
      return { statusCode: 500, data: "config required" };
    }

    // 每次根据配置新建
    transporterNew = nodemailer.createTransport(bodyData.config);
  }

  const promise = new Promise((resolve, reject) => {
    // 发送邮件
    transporterNew.sendMail(bodyData.receiver, (error, info) => {
      if (error) {
        console.log("发送失败:", error);
        return reject({ statusCode: 500, data: error });
      }
      transporter.close();

      console.log("发送成功:", info.response);
      return resolve({ statusCode: 200, data: info.response });
    });
  });
  const res = await promise.then((res) => res).catch((err) => err);

  return res;
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 9876 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
