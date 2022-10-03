import { SemVer } from 'semver';

export class Lochain {
  version: SemVer;
  url: URL;

  constructor(version: SemVer, url: URL) {
    this.version = version;
    this.url = url;
  }
}
