const http = require("http");
const DEFAULT_USER = { username: "apfwebdev", password: "123" };

const routes = {
  "/contact:get": (request, response) => {
    response.write("contacts page!");
    return response.end();
  },
  "/login:post": async (request, response) => {
    //response é um iterador
    for await (const data of request) {
      const user = JSON.parse(data);
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write("login has failed!");
        return response.end();
      }

      response.write("login has succeeded!");
      return response.end();
    }
  },
  default: (request, response) => {
    response.write("hello world!");
    return response.end();
  },
};

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const choosen = routes[routeKey] || routes.default;
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  return choosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("app running on port ", 3000));

module.exports = app;
