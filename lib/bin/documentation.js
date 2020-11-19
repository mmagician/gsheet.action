"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var fs_1 = require("fs");
var path_1 = require("path");
var readmePath = path_1.resolve(__dirname, '..', '..', 'README.md');
var README = fs_1.readFileSync(readmePath, 'utf8');
var split = README.split('\n');
var start = split.findIndex(function (line) { return line.includes('<!-- commands -->'); }) + 1;
var end = split.findIndex(function (line) { return line.includes('<!-- commandsstop -->'); });
var map = function (array, required) {
    if (required === void 0) { required = true; }
    return !array
        ? ''
        : array
            .map(function (key) {
            var _a = config_1["default"].descriptions[key], type = _a.type, description = _a.description, def = _a.def;
            return "- " + (required ? key : "[" + key + (def ? "=" + def : '') + "]?") + ":" + type + " - " + description;
        })
            .join('\n  ') + "\n  ";
};
var commands = Object.values(config_1["default"].commands)
    .map(function (_a) {
    var func = _a.func, _b = _a.args, _c = _b === void 0 ? {} : _b, required = _c.required, optional = _c.optional, options = _a.options;
    return "### " + func + "\n\n" + config_1["default"].commands[func].description + "\n\n- args\n  " + map(required) + map(optional, false) + map(options, false);
})
    .join('\n');
split.splice(start, end - start, commands);
fs_1.writeFileSync(readmePath, split.join('\n'));
