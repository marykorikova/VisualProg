import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatCSVFileToJSONFile } from '../src/formatCSVFileToJSONFile';
import { readFile, writeFile } from 'node:fs/promises';

vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
}));

describe('formatCSVFileToJSONFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call readFile and writeFile with correct parameters', async () => {
    const mockCSV = "p1;p2;p3\n1;A;b\n2;B;c";
    const expectedJSON = JSON.stringify([
      { p1: '1', p2: 'A', p3: 'b' },
      { p1: '2', p2: 'B', p3: 'c' }
    ], null, 2);

    (readFile as any).mockResolvedValue(mockCSV);

    await formatCSVFileToJSONFile('input.csv', 'output.json', ';');

    expect(readFile).toHaveBeenCalledWith('input.csv', 'utf-8');
    expect(writeFile).toHaveBeenCalledWith('output.json', expectedJSON, 'utf-8');
  });

  it('should process readFile error', async () => {
    (readFile as any).mockRejectedValue(new Error('File not found'));

    await expect(formatCSVFileToJSONFile('bad.csv', 'out.json', ';'))
      .rejects.toThrow('File not found');
    
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('should process csvToJSON error', async () => {
    const mockCSV = "h1;h2\na;b;c"; 
    (readFile as any).mockResolvedValue(mockCSV);

    await expect(formatCSVFileToJSONFile('in.csv', 'out.json', ';'))
      .rejects.toThrow();
    
    expect(writeFile).not.toHaveBeenCalled();
  });
});