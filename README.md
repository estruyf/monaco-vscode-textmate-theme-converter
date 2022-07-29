## Visual Studio Code theme converter to Monaco theme

The Monaco editor cannot use visual Studio Code themes. That is where this dependency comes into play.

This `@estruyf/vscode-theme-converter` dependency converts a JSON theme from VS Code to an understandable format for the Monaco editor.

> **Info**: The dependency is a fork from [Nishkal Kashyap's monaco-vscode-textmate-theme-converter](https://github.com/Nishkalkashyap/monaco-vscode-textmate-theme-converter)

## Installation

Run the following command to install the dependency to your solution:

```bash
npm i @estruyf/vscode-theme-converter

yarn add @estruyf/vscode-theme-converter
```

## Usage

```typescript
import { convertTheme, updateColor } from '@estruyf/vscode-theme-converter';

const vscodeTheme = convertTheme(textmateTheme);

const updatedColor = updateColor(colorValue);
```
