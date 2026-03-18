export function csvToJSON(input: string[], delimiter: string): object[] {
  if (!input || input.length === 0) {
    throw new Error("Input array is empty");
  }

  const headers = input[0].split(delimiter);
  
  if (headers.length === 0 || headers.every(h => h === '')) {
    throw new Error("Header row is empty or invalid");
  }

  const result: object[] = [];

  for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (line === '') continue;

    const values = line.split(delimiter);

    if (values.length !== headers.length) {
      throw new Error(`Row ${i + 1} has ${values.length} fields, expected ${headers.length}`);
    }

    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });

    result.push(obj);
  }

  if (result.length === 0) {
    throw new Error("No data rows found");
  }

  return result;
}