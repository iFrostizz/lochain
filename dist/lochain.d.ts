import { SemVer } from 'semver';
import { Wallet } from 'ethers';
export declare class Lochain {
    version: SemVer;
    url: URL;
    wallets: Wallet[];
    constructor(version: SemVer, url: URL, wallets: Wallet[]);
}
