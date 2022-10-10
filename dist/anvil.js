"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAnvil = void 0;
const child_process_1 = require("child_process");
const parser_1 = require("./parser");
/*exec("ps aux | grep 'anvil' | grep -v grep",
  function (error: any, stdout: any, stderr: any) {
    console.log('stdout: ' + stdout);
    if (error !== null) {
      console.log('exec output: ' + error);
    }
});*/
// spawn('sh', ['./kill.sh']);
const startAnvil = () => {
    const anvil_cmd = (0, child_process_1.spawn)('anvil');
    let lochain = new Promise((res, rej) => {
        anvil_cmd.stdout.on('data', (data) => {
            console.log("Anvil started !");
            const decoded = String(data);
            console.log(decoded);
            let parser = new parser_1.AnvilParser(decoded);
            let lochain = parser.parse_anvil();
            res(lochain);
        });
        anvil_cmd.on('close', (data) => {
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
