import * as core from '@actions/core';
import { GoogleSheet } from 'google-sheet-cli';


export interface Results {
  startRow?: Number;
  error?: Error;
}

export default async function run(): Promise<Results> {
  try {
    const spreadsheetId: string = core.getInput('spreadsheetId', { required: true });

    const { GSHEET_CLIENT_EMAIL, GSHEET_PRIVATE_KEY } = process.env;
    if (!GSHEET_CLIENT_EMAIL || !GSHEET_PRIVATE_KEY) throw 'Google sheets credentials have to be supplied';

    const gsheet = new GoogleSheet(spreadsheetId);
    await gsheet.authorize({
      client_email: GSHEET_CLIENT_EMAIL,
      private_key: GSHEET_PRIVATE_KEY,
    });

    let startRow: number = Number(core.getInput('startRow', { required: true })); 
    let worksheetTitle: string = core.getInput('worksheetTitle', { required: true }); 

    let max_iterations = 100;
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
      }
      const result = await gsheet.getData(queryOptions, spreadsheetId);
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

  } catch (error) {
    core.setFailed(error.message || error);
    return { error };
  }
}

!process.env.TEST && run();
