/// <reference types="node" />
import { URL } from 'url';
import { Lochain } from './lochain';
import { SemVer } from 'semver';
import { Wallet } from 'ethers';
export declare class AnvilParser {
    output: string;
    constructor(output: string);
    parse_anvil(): Lochain;
    parse_version(): SemVer;
    parse_url(): URL;
    parse_keys(): Wallet[];
}
