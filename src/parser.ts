import { URL } from 'url';
import { Lochain } from './lochain';
import { SemVer } from 'semver';

export class AnvilParser {
  output: string

  constructor(output: string) {
    this.output = output;
  }

  parse_anvil(): Lochain {
    const version: SemVer = this.parse_version();
    const url: URL = this.parse_url();

    return new Lochain(version, url);
  }

  parse_version(): SemVer {
    // TODO: actually parse it
    return new SemVer("0.1.0");
  }

  parse_url(): URL {
    let output = this.output;

    const list = "Listening on ";
    let sub = output.substring(output.indexOf(list) + list.length);
    sub = "https://" + sub;
    const url: URL = new URL(sub);

    return url;
  }
}

