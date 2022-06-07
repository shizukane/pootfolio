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
exports.editorCommand = void 0;
const vscode = require("vscode");
const command_1 = require("./command");
function editorCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        const textEditor = vscode.window.activeTextEditor;
        if (textEditor) {
            const cmdArgs = yield showCommandPrompt();
            const selectedText = textEditor.selection.isEmpty ?
                undefined :
                textEditor.document.getText(textEditor.selection);
            const output = yield command_1.runCommand(cmdArgs, selectedText);
            textEditor.edit(editBuilder => {
                if (selectedText) {
                    editBuilder.replace(textEditor.selection, output);
                }
                else {
                    editBuilder.insert(textEditor.selection.active, output.trimEnd());
                }
            });
        }
    });
}
exports.editorCommand = editorCommand;
function showCommandPrompt(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = yield vscode.window.showInputBox({
            prompt: "Enter command",
            ignoreFocusOut: true,
            validateInput: s => s.length === 0 ? 'Command must not be empty' : '',
        }, token);
        return { cmd: cmd ? cmd : '' };
    });
}
//# sourceMappingURL=editor_command.js.map