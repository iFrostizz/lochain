import Url from 'url-parse';
import { Lochain } from './lochain';
import { SemVer } from 'semver';
import { Wallet } from 'ethers';
export class AnvilParser {
    constructor(output) {
        this.output = output;
    }
    parse_anvil() {
        const version = this.parse_version();
        const url = this.parse_url();
        const wallets = this.parse_keys();
        return new Lochain(version, url, wallets);
    }
    parse_version() {
        // TODO: actually parse it
        return new SemVer("0.1.0");
    }
    parse_url() {
        let output = this.output;
        const list = "Listening on ";
        let sub = output.substring(output.indexOf(list) + list.length);
        sub = "http://" + sub;
        const url = new Url(sub);
        return url;
    }
    parse_keys() {
        const min = "Private Keys";
        const max = "Wallet";
        const output = this.output;
        const substring = output.substring(output.indexOf(min) + min.length, output.indexOf(max));
        let keys = substring.split(')');
        keys.shift();
        let private_keys = [];
        for (const key of keys) {
            const pkey = key.substring(1, key.indexOf('\n'));
            private_keys.push(new Wallet(pkey));
        }
        return private_keys;
    }
}
