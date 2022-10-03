import { SemVer } from 'semver';
import { Wallet } from 'ethers';

export class Lochain {
  version: SemVer;
  url: URL;
  wallets: Wallet[];

  constructor(version: SemVer, url: URL, wallets: Wallet[]) {
    this.version = version;
    this.url = url;
    this.wallets = wallets;
  }
}
