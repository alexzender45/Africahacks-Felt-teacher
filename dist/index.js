"use strict";

var _http = require("http");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
const server = (0, _http.createServer)(_app.default);
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map