const http = require("http");
const url = require("url");

const app = http.createServer();
app.on("request", (req, res) => {
    res.writeHead(200, {
        "content-type": "text/html;charset=utf8",
        hello: "world",
    });
    let {query, pathname} = url.parse(req.url, true);
    console.log(query.name);
    console.log(query.age);
    console.log(pathname);
    if (req.url == "/index" || req.url == "/") {
        res.end("welcome index");
        return;
    } else if (req.url == "/list") {
        res.end("welcome list");
        return;
    } else {
        res.end("not found");
        return;
    }
    if (req.method == "POST") {
        res.end("post");
    } else if (res.method == "GET") {
        res.end("get");
    }
});

app.listen(3000);
console.log("网站启动成功");
