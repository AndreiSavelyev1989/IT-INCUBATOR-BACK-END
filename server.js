const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

let requestsCount = 0;
const PORT = 3003;

const FAVICON = path.join(__dirname, "public", "favicon.png");

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;

  if (pathname !== "/favicon.ico") {
    requestsCount++;
  }

  if (req.method === "GET" && pathname === "/favicon.ico") {
    res.setHeader("Content-Type", "image/png");
    fs.createReadStream(FAVICON).pipe(res);
    return;
  }

  switch (req.url) {
    case "/":
    case "/courses": {
      res.write("BACK + FRONT " + requestsCount);
      break;
    }
    case "/students": {
      res.write("STUDENTS " + requestsCount);
      break;
    }
    default: {
      res.write("404 not found " + requestsCount);
      break;
    }
  }
  res.end();
});

server.listen(PORT, (req, res) => {
  console.log(`Server listen on ${PORT}`);
});
