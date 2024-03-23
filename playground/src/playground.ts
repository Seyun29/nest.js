import * as express from "express";
import { Cat } from "./cats/cats.model";
import 

const app: express.Express = express();

//Middleware => 실제 코드상 위치가 중요!!! 특정한 라우터한테만 거쳐가게 할 수 있다.
//매치되는 라우터를 찾으면 라우터 로직만 실행하고 거기서 멈춘다. (그 이후는 실행되지 않는다) => 라우터 순서도 중요하다.
app.use((req, res, next) => {
  //ex. Logging하는 미들웨어 (모든 라우터에 로깅은 필요하므로)
  // console.log(req.rawHeaders[1]);
  console.log("this is LOGGING middleware");
  next(); //run the next middleware or route handler that matches the request path
});

//* JSON Middleware
// express에서 제공하는 json middleware -> 사용하지 않으면 json parsing 불가
app.use(express.json());

//하나의 라우터
app.get("/", (req: express.Request, res: express.Response) => {
  //   console.log(req);
  //   console.log(req.rawHeaders);
  res.send(Cat);
});

//app.get을 써서 미들웨어 만들기
app.get(
  "**/cats/**",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //   console.log(req);
    // console.log(req.rawHeaders);
    console.log("this is CATS middleware");
    next();
  }
);

//* READ 고양이 전체 데이터 다 조회
//상태코드 : 200
//400 - 응답 실패
//500 - server internal error
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    // 강제 에러처리
    // throw new Error("This is an error");
    res.status(200).send({
      success: true,
      data: cats,
    });
  } catch (error: any) {
    // staus코드 지정해주지 않으면 200 ok로 나감
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//Dynamic Routing 구현
app.get("/cats/:id", (req: express.Request, res: express.Response) => {
  //   console.log(req);
  // find메서드 사용도 가능
  // Cat.find((cat) => cat.id === req.params.id);
  const id = req.params.id;
  res.send(Cat.filter((cat) => cat.id === id));
});

//* CREATE 고양이 데이터 생성
app.post("/cats", (req, res) => {
  try {
    console.log(req.body);
    Cat.push(req.body); //CREATE, push메소드 사용
    res.status(200).send({
      success: true,
      data: req.body,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

app.get("/cats/tom", (req: express.Request, res: express.Response) => {
  //   console.log(req);
  //   console.log(req.rawHeaders);
  res.send(Cat.filter((cat) => cat.name === "Tom"));
});

//아무 라우터랑도 일치하지 안흥ㄹ때 수행할 수 있는 미들웨어!
app.use((req, res) => {
  //   console.log(req.rawHeaders[1]);
  console.log("this is 404 middleware");
  res.status(400).send("404 Not Found");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
