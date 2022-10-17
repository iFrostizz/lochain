import Url from 'url-parse';
import { SemVer } from 'semver';
import { Wallet } from 'ethers';

export class Lochain {
  version: SemVer;
  url: Url<string>;
  wallets: Wallet[];

  constructor(version: SemVer, url: Url<string>, wallets: Wallet[]) {
    this.version = version;
    this.url = url;
    this.wallets = wallets;
  }
}
