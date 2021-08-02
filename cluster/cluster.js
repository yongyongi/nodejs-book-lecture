const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length; //내 컴퓨터 코어 갯수
console.log(numCPUs);
console.log(cluster.isMaster);

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디 : ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    //새로운 프로세스 생성
    cluster.fork();
  }

  //프로세스를 종료하면 실행된다.
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log("code", code, "signal", signal);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>cluster란?</h1>");
      res.write("<p>코어를 효율적으로 사용하는 기능!</p>");
      res.end();
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    })
    .listen(8834, () => {
      console.log(process.pid);
    });
}
