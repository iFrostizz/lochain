import { spawn } from 'child_process';
import { AnvilParser } from './parser';
import { Lochain } from './lochain';

/*exec("ps aux | grep 'anvil' | grep -v grep",
  function (error: any, stdout: any, stderr: any) {
    console.log('stdout: ' + stdout);
    if (error !== null) {
      console.log('exec output: ' + error);
    }
});*/

// spawn('sh', ['./kill.sh']);
export const startAnvil = (): Promise<Lochain | any> => {
  const anvil_cmd = spawn('anvil');

  let lochain = new Promise((res, rej) => {
    anvil_cmd.stdout.on('data', (data: any) => {
      console.log("Anvil started !");

      const decoded = String(data);
      console.log(decoded);

      let parser: AnvilParser = new AnvilParser(decoded);

      let lochain: Lochain = parser.parse_anvil();

      res(lochain);
    })

    anvil_cmd.on('close', (data: any) => {
      console.log('close', data);
      spawn('sh', ['./kill.sh']);

      rej(data);
    }

    );
  });

  return lochain;
}

/*fs.readFile('src/data/anvil_output.txt', 'utf8', (err: any, data: any) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  let parser: AnvilParser = new AnvilParser(data);

  parser.parse_anvil();
});*/
