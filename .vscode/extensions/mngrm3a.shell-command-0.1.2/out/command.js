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
exports.runCommand = exports.CaptureStream = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
var CaptureStream;
(function (CaptureStream) {
    CaptureStream["StdOut"] = "stdout";
    CaptureStream["StdErr"] = "stderr";
})(CaptureStream = exports.CaptureStream || (exports.CaptureStream = {}));
function runCommand(commandArgs, stdin) {
    return __awaiter(this, void 0, void 0, function* () {
        const args = commandArgs.args ? commandArgs.args : [];
        const captureStream = commandArgs.capture ? commandArgs.capture : CaptureStream.StdOut;
        const spawnOptions = Object.assign(Object.assign({}, commandArgs), { cwd: commandArgs.cwd ?
                commandArgs.cwd :
                vscode.workspace.workspaceFolders ?
                    vscode.workspace.workspaceFolders[0].uri.fsPath :
                    undefined, timeout: commandArgs.timeout ? commandArgs.timeout : 10 * 1000, shell: true });
        if (!commandArgs.cmd) {
            throw new Error('Command must not be empty');
        }
        return spawnCommand(commandArgs.cmd, args, captureStream, spawnOptions, stdin);
    });
}
exports.runCommand = runCommand;
function spawnCommand(command, args, captureStream, spawnOptions, stdin) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var _a, _b;
            const process = child_process_1.spawn(command, args, spawnOptions);
            const outputStream = captureStream === CaptureStream.StdOut ?
                process.stdout :
                process.stderr;
            let output = '';
            process.on("error", (error) => reject(error));
            process.on('close', (code) => {
                if (code === 0) {
                    resolve(output);
                }
                else {
                    reject(new Error(`Command '${command}' terminated with exit code ${code}`));
                }
            });
            outputStream === null || outputStream === void 0 ? void 0 : outputStream.on('data', (data) => output += data);
            if (stdin) {
                (_a = process.stdin) === null || _a === void 0 ? void 0 : _a.write(stdin);
                (_b = process.stdin) === null || _b === void 0 ? void 0 : _b.end();
            }
        });
    });
}
//# sourceMappingURL=command.js.map