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
exports.shellCommand = exports.EOL = void 0;
const vscode = require("vscode");
const command_1 = require("./command");
exports.EOL = /\r\n|\r|\n/;
function shellCommand(commandArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = (yield command_1.runCommand(commandArgs)).trimEnd();
        return ((commandArgs === null || commandArgs === void 0 ? void 0 : commandArgs.quickPick) !== false) ?
            yield showQuickPick(output) :
            output;
    });
}
exports.shellCommand = shellCommand;
function showQuickPick(stdout) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = stdout.split(exports.EOL).map(l => l.trim()).filter(l => l.length > 0);
        if (items.length > 1) {
            return yield vscode.window.showQuickPick(items, {
                canPickMany: false,
                ignoreFocusOut: true
            });
        }
        else {
            return stdout;
        }
    });
}
//# sourceMappingURL=shell_command.js.map