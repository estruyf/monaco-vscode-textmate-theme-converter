import * as monaco from 'monaco-editor';
export interface IVSCodeTheme {
    "$schema": "vscode://schemas/color-theme";
    "type": 'dark' | 'light';
    colors: {
        [name: string]: string;
    };
    tokenColors: {
        name?: string;
        "scope": string[] | string;
        "settings": IRule;
    }[];
}
export interface IRule {
    foreground?: string;
    background?: string;
    fontStyle?: string;
}
export interface IMonacoRule extends IRule {
    token: string;
}
export declare type IMonacoThemeRule = monaco.editor.ITokenThemeRule[];
