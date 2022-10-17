import Url from 'url-parse';
import { Lochain } from './lochain';
import { SemVer } from 'semver';
import { Wallet } from 'ethers';
export declare class AnvilParser {
    output: string;
    constructor(output: string);
    parse_anvil(): Lochain;
    parse_version(): SemVer;
    parse_url(): Url<string>;
    parse_keys(): Wallet[];
}
