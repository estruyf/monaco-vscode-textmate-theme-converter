"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateColor = exports.convertTheme = exports.convertThemeFromDir = exports.convertThemeFromFilePath = void 0;
var tslib_1 = require("tslib");
var fs = require("fs-extra");
var path = require("path");
tslib_1.__exportStar(require("./interfaces"), exports);
function convertThemeFromFilePath(inputFilePath, outputFilePath) {
    var exists = fs.existsSync(inputFilePath);
    if (!exists)
        throw Error('Filepath does not exists');
    var stats = fs.statSync(inputFilePath);
    var isFile = stats.isFile();
    if (!isFile)
        throw Error('Expected an input file path, got a directory');
    var themeFile = fs.readFileSync(inputFilePath).toString();
    themeFile = themeFile.replace(/(\/\/").+?[\n\r]/g, '');
    var theme = JSON.parse(themeFile);
    var convertedTheme = convertTheme(theme);
    fs.ensureFileSync(outputFilePath);
    fs.writeFileSync(outputFilePath, JSON.stringify(convertedTheme, null, 4));
}
exports.convertThemeFromFilePath = convertThemeFromFilePath;
function convertThemeFromDir(inputDir, outDir) {
    var _this = this;
    var callBack = function (fileName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var filePath, themeFile, theme, out, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    filePath = path.join(inputDir, fileName);
                    return [4 /*yield*/, fs.stat(filePath)];
                case 1:
                    if ((_a.sent()).isDirectory()) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fs.readFile(filePath)];
                case 2:
                    themeFile = (_a.sent()).toString();
                    themeFile = themeFile.replace(/(\/\/").+?[\n\r]/g, '');
                    theme = JSON.parse(themeFile);
                    out = convertTheme(theme);
                    fs.ensureFileSync(path.join(outDir, fileName));
                    return [4 /*yield*/, fs.writeFile(path.join(outDir, fileName), JSON.stringify(out))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    throw new Error(err_1);
                case 5: return [2 /*return*/];
            }
        });
    }); };
    fs.readdirSync(inputDir).map(callBack);
}
exports.convertThemeFromDir = convertThemeFromDir;
/**
 * Convert a textmate theme to a Monaco theme
 * @param theme
 * @returns
 */
function convertTheme(theme) {
    var monacoThemeRule = [];
    var returnTheme = {
        inherit: false,
        base: 'vs-dark',
        colors: {},
        rules: monacoThemeRule,
        encodedTokensColors: []
    };
    // Update all colors
    var colorKeys = Object.keys(theme.colors);
    for (var _i = 0, colorKeys_1 = colorKeys; _i < colorKeys_1.length; _i++) {
        var key = colorKeys_1[_i];
        returnTheme.colors[key] = exports.updateColor(theme.colors[key]);
    }
    // Create all rules
    theme.tokenColors.forEach(function (color) {
        if (typeof color.scope === 'string') {
            var split = color.scope.split(',');
            if (split.length > 1) {
                color.scope = split;
                evalAsArray();
                return;
            }
            var rule = Object.assign({}, color.settings, {
                token: color.scope.trim()
            });
            rule = validateRule(rule);
            monacoThemeRule.push(rule);
            return;
        }
        else {
            evalAsArray();
        }
        function evalAsArray() {
            if (color.scope) {
                color.scope.map(function (scope) {
                    var rule = Object.assign({}, color.settings, {
                        token: scope.trim()
                    });
                    rule = validateRule(rule);
                    monacoThemeRule.push(rule);
                });
            }
        }
    });
    return returnTheme;
}
exports.convertTheme = convertTheme;
/**
 * Validate a textmate rule
 * @param rule
 * @returns
 */
var validateRule = function (rule) {
    if (rule.foreground) {
        rule.foreground = exports.updateColor(rule.foreground);
    }
    if (rule.background) {
        rule.background = exports.updateColor(rule.background);
    }
    if (rule.foreground === "") {
        delete rule.foreground;
    }
    if (rule.background === "") {
        delete rule.background;
    }
    return rule;
};
/**
 * Update colors for the Monaco theme
 * @param value
 * @returns
 */
exports.updateColor = function (value) {
    if (value && value.startsWith("#") && value.length === 4) {
        var split = value.split('#').pop();
        return "#" + split + split;
    }
    if (value && value === "white") {
        return "#ffffff";
    }
    if (value && value === "black") {
        return "#000000";
    }
    if (value && value === "inherit") {
        return "";
    }
    if (value === null) {
        return "";
    }
    return value;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDZCQUErQjtBQUMvQiwyQkFBNkI7QUFFN0IsdURBQTZCO0FBRTdCLFNBQWdCLHdCQUF3QixDQUFDLGFBQXFCLEVBQUUsY0FBc0I7SUFDcEYsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QyxJQUFHLENBQUMsTUFBTTtRQUFFLE1BQU0sS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFFcEQsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUIsSUFBRyxDQUFDLE1BQU07UUFBRSxNQUFNLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBRXhFLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkQsSUFBTSxLQUFLLEdBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsSUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQWRELDREQWNDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsUUFBZ0IsRUFBRSxNQUFjO0lBQXBF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