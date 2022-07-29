(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "fs-extra", "path", "./interfaces"], factory);
    }
})(function (require, exports) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUNBLDZCQUErQjtJQUMvQiwyQkFBNkI7SUFFN0IsdURBQTZCO0lBRTdCLFNBQWdCLHdCQUF3QixDQUFDLGFBQXFCLEVBQUUsY0FBc0I7UUFDcEYsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1QyxJQUFHLENBQUMsTUFBTTtZQUFFLE1BQU0sS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFFcEQsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6QyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsSUFBRyxDQUFDLE1BQU07WUFBRSxNQUFNLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBRXhFLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBTSxLQUFLLEdBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQWRELDREQWNDO0lBRUQsU0FBZ0IsbUJBQW1CLENBQUMsUUFBZ0IsRUFBRSxN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