"use strict";
exports.__esModule = true;
exports.startAnvil = void 0;
var child_process_1 = require("child_process");
var parser_1 = require("./parser");
/*exec("ps aux | grep 'anvil' | grep -v grep",
  function (error: any, stdout: any, stderr: any) {
    console.log('stdout: ' + stdout);
    if (error !== null) {
      console.log('exec output: ' + error);
    }
});*/
// spawn('sh', ['./kill.sh']);
var startAnvil = function () {
    var anvil_cmd = (0, child_process_1.spawn)('anvil');
    var lochain = new Promise(function (res, rej) {
        anvil_cmd.stdout.on('data', function (data) {
            console.log("Anvil started !");
            var decoded = String(data);
            console.log(decoded);
            var parser = new parser_1.AnvilParser(decoded);
            var lochain = parser.parse_anvil();
            res(lochain);
        });
        anvil_cmd.on('close', function (data) {
            console.log('close', data);
            (0, child_process_1.spawn)('sh', ['./kill.sh']);
            rej(data);
        });
    });
    return lochain;
};
exports.startAnvil = startAnvil;
/*fs.readFile('src/data/anvil_output.txt', 'utf8', (err: any, data: any) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  let parser: AnvilParser = new AnvilParser(data);

  parser.parse_anvil();
});*/
