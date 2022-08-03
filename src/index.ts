import { IVSCodeTheme, IMonacoThemeRule, IMonacoRule } from "./interfaces";
import * as monaco from 'monaco-editor';
export * from './interfaces';

/**
 * Convert a textmate theme to a Monaco theme
 * @param theme 
 * @returns 
 */
export function convertTheme(theme: IVSCodeTheme): monaco.editor.IStandaloneThemeData {
  
  const monacoThemeRule: IMonacoThemeRule = [];
  const returnTheme: monaco.editor.IStandaloneThemeData = {
    inherit: false,
    base: 'vs-dark',
    colors: {},
    rules: monacoThemeRule,
    encodedTokensColors: []
  };

  // Update all colors
  const colorKeys = Object.keys(theme.colors);
  for (const key of colorKeys) {
    returnTheme.colors[key] = updateColor(theme.colors[key]);
  }
  
  // Create all rules
  theme.tokenColors.forEach((color) => {
    if (typeof color.scope === 'string') {
      const split = color.scope.split(',');

      if (split.length > 1) {
        color.scope = split;
        evalAsArray();
        return;
      }

      let rule = Object.assign({}, color.settings, {
        token: color.scope.trim()
      });

      rule = validateRule(rule);
      monacoThemeRule.push(rule);
      return;
    } else {
      evalAsArray();
    }
    
    function evalAsArray() {
      if (color.scope) {
        (color.scope as string[]).map((scope) => {
          let rule: IMonacoRule = Object.assign({}, color.settings, {
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

/**
 * Validate a textmate rule
 * @param rule 
 * @returns 
 */
const validateRule = (rule: IMonacoRule): IMonacoRule => {
  if (rule.foreground) {
    rule.foreground = updateColor(rule.foreground);
  }
  if (rule.background) {
    rule.background = updateColor(rule.background);
  }

  if (rule.foreground === "") {
    delete rule.foreground;
  }

  if (rule.background === "") {
    delete rule.background;
  }

  return rule;
}

/**
 * Update colors for the Monaco theme
 * @param value 
 * @returns 
 */
export const updateColor = (value: string) => {
  if (value && value.startsWith(`#`) && value.length === 4) {
    const split = value.split('#').pop();
    return `#${split}${split}`;
  }

  if (value && value.startsWith(`#`) && value.length > 4 && value.length < 7) {
    return "";
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
}