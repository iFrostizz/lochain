import * as fs from 'fs';
import { spawn, exec } from 'child_process';
import { AnvilParser } from './parser';

// TODO: wouldn't work on Windows
/*exec("ps aux | grep 'anvil' | grep -v grep",
  function (error: any, stdout: any, stderr: any) {
    console.log('stdout: ' + stdout);
    if (error !== null) {
      console.log('exec output: ' + error);
    }
});*/

/*const anvil_cmd = spawn('anvil');

anvil_cmd.stdout.on('data', (data: any) => {
  // console.log(data);

  // const data = Buffer.toString(data);

  const decoded = String(data);

  console.log(decoded);
})

anvil_cmd.stdout.on('error', () => {
  console.log("err");
})*/

fs.readFile('src/data/anvil_output.txt', 'utf8', (err: any, data: any) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  console.log(data);

  let parser: AnvilParser = new AnvilParser(data);

  parser.parse_anvil();
});
