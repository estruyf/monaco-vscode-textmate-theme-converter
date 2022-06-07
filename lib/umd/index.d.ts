import { IVSCodeTheme } from "./interfaces";
import * as monaco from 'monaco-editor';
export * from './interfaces';
export declare function convertThemeFromFilePath(inputFilePath: string, outputFilePath: string): void;
export declare function convertThemeFromDir(inputDir: string, outDir: string): void;
/**
 * Convert a textmate theme to a Monaco theme
 * @param theme
 * @returns
 */
export declare function convertTheme(theme: IVSCodeTheme): monaco.editor.IStandaloneThemeData;
/**
 * Update colors for the Monaco theme
 * @param value
 * @returns
 */
export declare const updateColor: (value: string) => string;
