"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const editor_command_1 = require("./editor_command");
const shell_command_1 = require("./shell_command");
function activate(context) {
    const channel = vscode.window.createOutputChannel('Shell Command');
    context.subscriptions.push(vscode.commands.registerCommand('shell-command.run', run(shell_command_1.shellCommand, channel, {
        label: 'Configure Task',
        handler: () => { vscode.commands.executeCommand('workbench.action.tasks.configureTaskRunner'); }
    })), vscode.commands.registerTextEditorCommand('shell-command.edit', run(editor_command_1.editorCommand, channel)));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function run(fn, channel, action) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fn(...args);
        }
        catch (error) {
            showError(error, channel, action);
        }
    });
}
function showError(error, channel, action) {
    return __awaiter(this, void 0, void 0, function* () {
        const displayMessage = error instanceof Error ?
            error.message :
            error;
        const logMessage = error instanceof Error && error.stack ?
            error.stack :
            displayMessage;
        channel.appendLine(logMessage);
        if (action) {
            const answer = yield vscode.window.showErrorMessage(displayMessage, action.label);
            if (answer === action.label) {
                action.handler();
            }
        }
        else {
            vscode.window.showErrorMessage(displayMessage);
        }
    });
}
//# sourceMappingURL=extension.js.map