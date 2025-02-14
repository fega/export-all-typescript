'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const TS_EXTENSION_REGEX = /\.ts$/

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "export-index" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.exportAllTypescript', () => {
        const currentFileDir = path.dirname(vscode.window.activeTextEditor.document.uri.fsPath);
        const files = fs.readdirSync(currentFileDir)
            .filter(file => !/^index[.]\w+$/i.test(file))

        const text = files
            .sort()
            .map(file => `export * from './${file.replace(TS_EXTENSION_REGEX,'')}';`).join('\n');

        vscode.window.activeTextEditor.edit((b) => b.insert(new vscode.Position(0, 0), text));
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}