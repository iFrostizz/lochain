"use strict";
exports.__esModule = true;
exports.AnvilParser = void 0;
var url_parse_1 = require("url-parse");
var lochain_1 = require("./lochain");
var semver_1 = require("semver");
var ethers_1 = require("ethers");
var AnvilParser = /** @class */ (function () {
    function AnvilParser(output) {
        this.output = output;
    }
    AnvilParser.prototype.parse_anvil = function () {
        var version = this.parse_version();
        var url = this.parse_url();
        var wallets = this.parse_keys();
        return new lochain_1.Lochain(version, url, wallets);
    };
    AnvilParser.prototype.parse_version = function () {
        // TODO: actually parse it
        return new semver_1.SemVer("0.1.0");
    };
    AnvilParser.prototype.parse_url = function () {
        var output = this.output;
        var list = "Listening on ";
        var sub = output.substring(output.indexOf(list) + list.length);
        sub = "http://" + sub;
        var url = new url_parse_1["default"](sub);
        return url;
    };
    AnvilParser.prototype.parse_keys = function () {
        var min = "Private Keys";
        var max = "Wallet";
        var output = this.output;
        var substring = output.substring(output.indexOf(min) + min.length, output.indexOf(max));
        var keys = substring.split(')');
        keys.shift();
        var private_keys = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var pkey = key.substring(1, key.indexOf('\n'));
            private_keys.push(new ethers_1.Wallet(pkey));
        }
        return private_keys;
    };
    return AnvilParser;
}());
exports.AnvilParser = AnvilParser;
