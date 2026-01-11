const fs = require("fs");
const path = require("path");

function myRequire(filePath) {
  const absolutePath = path.resolve(filePath);
  const code = fs.readFileSync(absolutePath, "utf-8");
  const module = { exports: {} };

  const wrapper = new Function("exports", "module", code);

  wrapper(module.exports, module);
  return module.exports;
}
module.exports = myRequire;
