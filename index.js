const net = require("net");
const Koa = require("koa");
const http = require("http");
const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");

const app = new Koa();
const ioServer = http.createServer(app.callback());
const io = require("socket.io")(ioServer);
const r = new Router();
app.use(serve("./assets"));
app.use(bodyParser());

const getSparkSocket = () =>
  new Promise((resolve) => {
    const sparkServer = net.createServer((socket) => {
      console.log("Spark server connected!");
      resolve(socket);
    });
    sparkServer.listen(1234);
    console.log("Spark socket listening on port 1234");
    console.log("Please start spark server!");
  });

const main = async () => {
  const sparkSocket = await getSparkSocket();

  r.post("/predictions", async (ctx) => {
    const { body } = ctx.request;
    console.log(body);
    if (body.length) {
      io.emit("predict", body);
    }
    ctx.body = "Success";
  });

  io.on("connection", (socket) => {
    console.log("Browser connected");
    socket.on("tweet", (msg) => {
      sparkSocket.write(`TWEET_APP ${msg}\n`);
    });
  });

  app.use(r.routes());
  ioServer.listen(3000);
  console.log("HTTP server listening on port 3000");
  console.log(
    "Open browser on http://localhost:3000 and try to tweet something!"
  );
};
main();
