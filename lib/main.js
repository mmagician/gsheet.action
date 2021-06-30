"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const google_sheet_cli_1 = require("google-sheet-cli");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const spreadsheetId = core.getInput('spreadsheetId', { required: true });
            const { GSHEET_CLIENT_EMAIL, GSHEET_PRIVATE_KEY } = process.env;
            if (!GSHEET_CLIENT_EMAIL || !GSHEET_PRIVATE_KEY)
                throw 'Google sheets credentials have to be supplied';
            const gsheet = new google_sheet_cli_1.GoogleSheet(spreadsheetId);
            yield gsheet.authorize({
                client_email: GSHEET_CLIENT_EMAIL,
                private_key: GSHEET_PRIVATE_KEY,
            });
            let startRow = Number(core.getInput('startRow', { required: true }));
            let worksheetTitle = core.getInput('worksheetTitle', { required: true });
            let max_iterations = 2500;
            let i = 0;
            let rawData = [];
            while (true && i < max_iterations) {
                startRow = startRow + 1;
                i = i + 1;
                const queryOptions = {
                    minCol: 1,
                    maxCol: 1,
                    minRow: startRow,
                    maxRow: startRow,
                    worksheetTitle: worksheetTitle
                };
                const result = yield gsheet.getData(queryOptions, spreadsheetId);
                let parsed_result = JSON.parse(JSON.stringify({ result }));
                core.info(`Checking row ${startRow}`);
                rawData = parsed_result["result"]["rawData"];
                if (rawData.length == 0) {
                    core.info(`Found no data in row ${startRow}, breaking`);
                    break;
                }
            }
            if (rawData.length != 0) {
                // still not found an empty cell, break with error
                throw new Error(`Empty cell not found until line ${startRow}`);
            }
            core.setOutput('lastRow', startRow);
            return { startRow };
        }
        catch (error) {
            core.setFailed(error.message || error);
            return { error };
        }
    });
}
exports.default = run;
!process.env.TEST && run();
