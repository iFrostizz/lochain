"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnvilParser = void 0;
const url_1 = require("url");
const lochain_1 = require("./lochain");
const semver_1 = require("semver");
const ethers_1 = require("ethers");
class AnvilParser {
    constructor(output) {
        this.output = output;
    }
    parse_anvil() {
        const version = this.parse_version();
        const url = this.parse_url();
        const wallets = this.parse_keys();
        return new lochain_1.Lochain(version, url, wallets);
    }
    parse_version() {
        // TODO: actually parse it
        return new semver_1.SemVer("0.1.0");
    }
    parse_url() {
        let output = this.output;
        const list = "Listening on ";
        let sub = output.substring(output.indexOf(list) + list.length);
        sub = "http://" + sub;
        const url = new url_1.URL(sub);
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
            private_keys.push(new ethers_1.Wallet(pkey));
        }
        return private_keys;
    }
}
exports.AnvilParser = AnvilParser;
