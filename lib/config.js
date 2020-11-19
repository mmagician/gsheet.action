"use strict";
var _a, _b;
exports.__esModule = true;
exports.Func = exports.Arg = void 0;
var Arg;
(function (Arg) {
    Arg["worksheetTitle"] = "worksheetTitle";
    Arg["spreadsheetId"] = "spreadsheetId";
    Arg["spreadsheetTitle"] = "spreadsheetTitle";
    Arg["valueInputOption"] = "valueInputOption";
    Arg["data"] = "data";
    Arg["range"] = "range";
    Arg["minRow"] = "minRow";
    Arg["maxRow"] = "maxRow";
    Arg["minCol"] = "minCol";
    Arg["maxCol"] = "maxCol";
    Arg["hasHeaderRow"] = "hasHeaderRow";
})(Arg = exports.Arg || (exports.Arg = {}));
var descriptions = (_a = {},
    _a[Arg.worksheetTitle] = {
        type: 'string',
        description: 'The title of the worksheet (needed if no previous command set the worksheetTitle globally)'
    },
    _a[Arg.spreadsheetId] = {
        type: 'string',
        description: 'The id of the spreadsheet (needed if no previous command set the spreadsheetId globally)'
    },
    _a[Arg.spreadsheetTitle] = {
        type: 'string',
        description: 'The title of the worksheet'
    },
    _a[Arg.valueInputOption] = {
        type: 'string',
        description: 'The input value to be used',
        def: 'RAW'
    },
    _a[Arg.data] = {
        type: 'string',
        description: 'The data to be used as a JSON string - nested array [["1", "2", "3"]]'
    },
    _a[Arg.range] = {
        type: 'string',
        description: 'Range in a1 notation to be used for the operation'
    },
    _a[Arg.minCol] = {
        type: 'number',
        description: 'Starting row of the operation',
        def: '1'
    },
    _a[Arg.minRow] = {
        type: 'number',
        description: 'Starting row of the operation',
        def: '1'
    },
    _a[Arg.maxCol] = {
        type: 'number',
        description: 'Last row of the operation'
    },
    _a[Arg.maxRow] = {
        type: 'number',
        description: 'Last row of the operation'
    },
    _a[Arg.hasHeaderRow] = {
        type: 'boolean',
        description: 'If the first row should be treated as header row'
    },
    _a);
var Func;
(function (Func) {
    Func["addWorksheet"] = "addWorksheet";
    Func["getWorksheet"] = "getWorksheet";
    Func["getSpreadsheet"] = "getSpreadsheet";
    Func["removeWorksheet"] = "removeWorksheet";
    Func["updateData"] = "updateData";
    Func["appendData"] = "appendData";
    Func["getData"] = "getData";
    Func["addSpreadsheet"] = "addSpreadsheet";
    Func["getSpreadsheetInfo"] = "getSpreadsheetInfo";
})(Func = exports.Func || (exports.Func = {}));
var config = {
    descriptions: descriptions,
    commands: (_b = {},
        _b[Func.addSpreadsheet] = {
            func: Func.addSpreadsheet,
            description: 'Add a spreadsheet with the specified title to the spreadsheet',
            args: {
                required: [Arg.spreadsheetTitle]
            }
        },
        _b[Func.getSpreadsheet] = {
            func: Func.getSpreadsheet,
            description: 'Get a spreadsheet with the specified title',
            args: {
                optional: [Arg.spreadsheetId]
            }
        },
        _b[Func.addWorksheet] = {
            func: Func.addWorksheet,
            description: 'Add a worksheet with the specified title to the spreadsheet',
            args: {
                required: [Arg.worksheetTitle],
                optional: [Arg.spreadsheetId]
            }
        },
        _b[Func.getWorksheet] = {
            func: Func.getWorksheet,
            description: 'Get a worksheet with the specified title',
            args: {
                required: [Arg.worksheetTitle],
                optional: [Arg.spreadsheetId]
            }
        },
        _b[Func.removeWorksheet] = {
            func: Func.removeWorksheet,
            description: 'Remove an existing worksheet with the specified title',
            args: {
                required: [Arg.worksheetTitle],
                optional: [Arg.spreadsheetId]
            }
        },
        _b[Func.updateData] = {
            func: Func.updateData,
            description: 'Updates cells with the specified data (at the specified range)',
            args: {
                required: [Arg.data],
                optional: [Arg.spreadsheetId]
            },
            options: [Arg.minRow, Arg.minCol, Arg.range, Arg.valueInputOption, Arg.worksheetTitle]
        },
        _b[Func.appendData] = {
            func: Func.appendData,
            description: 'Append cells with the specified data after the last row (in starting col)',
            args: {
                required: [Arg.data],
                optional: [Arg.spreadsheetId]
            },
            options: [Arg.minCol, Arg.range, Arg.valueInputOption, Arg.worksheetTitle]
        },
        _b[Func.getData] = {
            func: Func.getData,
            description: 'Get cell data (within specified range)',
            args: {
                optional: [Arg.spreadsheetId]
            },
            options: [Arg.minRow, Arg.minCol, Arg.maxRow, Arg.maxCol, Arg.range, Arg.hasHeaderRow, Arg.worksheetTitle]
        },
        _b)
};
exports["default"] = config;
