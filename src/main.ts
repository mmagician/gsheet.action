import * as core from '@actions/core';
import { GoogleSheet } from 'google-sheet-cli';


export interface Results {
  lastRow?: Number;
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
    let worksheetName: string = core.getInput('worksheetName', { required: true }); 

    
    while (true) {
      startRow = startRow + 1;
      const queryOptions = {
        minCol: 1,
        maxCol: 1,
        minRow: startRow,
        maxRow: startRow,
        worksheetName: worksheetName
      }
      const result = await gsheet.getData(queryOptions, spreadsheetId);

      if (!result) {
        break;
      }
    }

    const lastRow = startRow;
    core.setOutput('lastRow', lastRow);

    return { lastRow };
  } catch (error) {
    core.setFailed(error.message || error);
    return { error };
  }
}

!process.env.TEST && run();
