//http로 서버 구현

const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const data = fs.readFileSync("./server.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  })
  .listen(8080, () => {
    console.log("8080 포트가 연결 되었습니다.");
  });

//https로 서버 구현

//https로 서버 구현

// const https = require("https");
// const fs = require("fs");

// https
//   .createServer(
//     {
//       cert: fs.readFileSync("도메인 인증서 경로"),
//       key: fs.readFileSync("도메인 비밀키 경로"),
//       ca: [
//         fs.readFileSync("상위 인증서 경로"),
//         fs.readFileSync("상위 인증서 경로"),
//       ],
//     },
//     (req, res) => {
//       res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//       res.end("<h1>인증서와 키가 있어야 실행 됌</h1>");
//     }
//   )
//   .listen(443, () => {
//     console.log("443 포트가 연결 되었습니다.");
//   });

//http2로 서버 구현

// const http2 = require("http2");
// const fs = require("fs");

// http2
//   .createServer(
//     {
//       cert: fs.readFileSync("도메인 인증서 경로"),
//       key: fs.readFileSync("도메인 비밀키 경로"),
//       ca: [
//         fs.readFileSync("상위 인증서 경로"),
//         fs.readFileSync("상위 인증서 경로"),
//       ],
//     },
//     (req, res) => {
//       res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//       res.end("<h1>이것도 인증서와 키가 있어야 실행 됌</h1>");
//     }
//   )
//   .listen(8080, () => {
//     console.log("8080 포트가 연결 되었습니다");
//   });
