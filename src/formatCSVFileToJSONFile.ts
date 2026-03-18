import { readFile, writeFile } from 'node:fs/promises';
import { csvToJSON } from './csvToJSON';

export async function formatCSVFileToJSONFile(
  input: string,
  output: string,
  delimiter: string
): Promise<void> {
  try {
    const data = await readFile(input, 'utf-8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      throw new Error("Input array is empty");
    }
    
    const jsonData = csvToJSON(lines, delimiter);
    const jsonString = JSON.stringify(jsonData, null, 2);
    await writeFile(output, jsonString, 'utf-8');
  } catch(error) {
    throw error;
  }
}