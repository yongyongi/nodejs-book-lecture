# Express

http 모듈로 웹서버를 만들 때는 코드가 지저분하고, 확장성이 떨어진다. 이 부분을 프레임워크로 해결할 수 있다. 대표적인 프레임워크로 express, koa, hapi가 있지만, 가장 편하고 안전한 프레임워크인 express를 많이 사용한다.

express에는 미들웨어가 있다. 대표적인 미들웨어로는 cookie-parser, morgan, cors, express-session, multer 등이 있다. http로 구현하기에 복잡한 코드들을 미들웨어를 통해 쉽게 사용할 수 있고, 에러도 미들웨어로 받아 처리 할 수 있다.

express에서는 따로 설정을 하지않아도 400번, 500번 에러를 표시해준다. 그래도 정확한 에러처리를 직접해주는게 좋다.

## 자주 사용하는 미들웨어

- cookie-parser

- morgan

  morgan("dev") - 간단한 요청과 응답에 대한 로그가 표시(개발시 사용)

  morgan("combined") - IP, 시간, 브라우저 등등 상세한 로그가 표시(배포시 사용)

- session

- multer

## 에러 미들웨어

```
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

next()를 사용하면 다음 미들웨어로 이동하지만, next(err) 이렇게 에러 인수를 넣어주면 에러미들웨어로 이동한다.

에러와는 별개지만, next(route)는 현재 미들웨어를 실행하지 않고 다음 미들웨어로 넘기는 것이다. 그럼 왜 쓰는 걸까? 조건문을 사용할 때 쓰인다. `if(true) next() else next(route)`

## express 메소드

- express.json()

  application/json 타입 파싱

  클라이언트에서 json데이터를 보냈을때 파싱해서 req.body에 넣어준다.

- express.static()

  express.static() 정적파일들을 제공해준다.
  요청경로와 실제경로가 다르기 때문에 보안상 안전하다.

  보통의 미들웨어는 내부에서 next를 실행하지만, express.static은 실제경로가 존재한다면, next실행은 안한다.

- express.Router()

- express.urlencoded()

  application/x-www-form-urlencoded 타입 파싱

  express.urlencoded({extended:true}), 클라이언트에서 form submit 할때, form을 파싱, extended는 form을 파싱할때 쿼리스트링을 어떻게 처리할지 결정하는 역할.

  true 설정이 더 강력하기 때문에 추천 (true는 qs, false면 querystring)

  qs모듈은 직접 설치를 해서 사용해야하고, querystring모듈은 node.js에 기본 모듈이여서 require해서 바로 사용할 수 있다.

## http모듈과 express모듈의 응답코드 차이

http모듈에서의 res.writeHead() , res.end()를 express에서는 res.send()로 사용할 수 있다. 디폴트 상태코드로 200이 들어가지만, 바꾸고 싶을 경우 res.status().send()해주면 된다. 상세한 header설정은 res.setHeader()로 할 수 있다.

또, res.writeHead(200,{"Content-Type": "application/json"}), res.end(JSON.stringify({hello:"yongyongi"})) 의 응답설정을 express에서는 res.json()로 응답하면 된다. 자동으로 Content-type이 application/json으로 된다.

## 현업에서의 상태코드

이전에 프로젝트를 진행하였을때, 상태코드를 상세히 작성하였는데 이 강의를 듣고 나서 그 행동이 위험할 수도 있다는 것을 알았다. 물론 상태코드를 정확히 작성해주면 어떤부분에 문제가 생겼는지 단서를 찾을 수 있지만, 반대로 해커에게는 힌트가 될 수도 있다. 이런 보안 문제로 현업에서는 400대 에러를 404로 통일 하는 경우도 있다고 한다. 다음 프로젝트를 진행할 때에는 보안에 좀 더 힘을 쓰기위해서 세세한 상태코드는 피해야겠다.

## 사용시 주의점

- app.use로 미들웨어 설정을 하면서 순서에도 신경을 쓰자. 상황에 맞게 미들웨어 순서를 정하여 성능을 높이는게 중요하다.

- res.send()와 res.json()을 하나의 미들웨어에서 2개이상 사용하면 에러가 뜬다. 하나의 미들웨어에는 하나의 응답만 있어야한다.
