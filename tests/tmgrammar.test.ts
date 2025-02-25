import * as path from 'node:path';
import * as fs from 'node:fs';
import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as vsctm from 'vscode-textmate';
import * as oniguruma from 'vscode-oniguruma';

// Helper function to create a registry
async function createRegistry(grammarPath: string): Promise<vsctm.Registry> {
  const wasmBin = fs.readFileSync(path.join(
    require.resolve('vscode-oniguruma'),
    '../onig.wasm'
  )).buffer;

  const vscodeOnigurumaLib = oniguruma.loadWASM(wasmBin).then(() => {
    return {
      createOnigScanner(patterns: string[]) { return new oniguruma.OnigScanner(patterns); },
      createOnigString(s: string) { return new oniguruma.OnigString(s); }
    };
  });

  // Create a registry that can create a grammar from a scope name
  return new vsctm.Registry({
    onigLib: vscodeOnigurumaLib,
    loadGrammar: async (scopeName) => {
      if (scopeName === 'source.solidity') {
        const grammarContent = fs.readFileSync(grammarPath, 'utf8');
        return vsctm.parseRawGrammar(grammarContent, grammarPath);
      }
      return null;
    }
  });
}

// Parse a test file and run the assertions
async function runTest(registry: vsctm.Registry, testPath: string): Promise<void> {
  const grammar = await registry.loadGrammar('source.solidity');
  if (!grammar) {
    throw new Error('Failed to load grammar');
  }

  const testContent = fs.readFileSync(testPath, 'utf8');
  const lines = testContent.split(/\r?\n/);

  let ruleStack = vsctm.INITIAL;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) continue;

    // Process the line
    const lineTokens = grammar.tokenizeLine(line, ruleStack);
    ruleStack = lineTokens.ruleStack;

    // Check if the next line contains assertions
    if (i + 1 < lines.length && lines[i + 1].includes('^')) {
      const assertionLine = lines[i + 1];

      // Find all assertions in the line
      const assertions = findAssertions(assertionLine);

      for (const assertion of assertions) {
        const { column, expectedScope, isNegative } = assertion;

        // Find the token at the specified column
        const token = findTokenAtColumn(lineTokens.tokens, column);

        if (token) {
          const scopes = token.scopes;

          if (isNegative) {
            assert.ok(
              !scopes.includes(expectedScope),
              `Line ${i + 1}, column ${column}: Expected token NOT to have scope '${expectedScope}', but it does. Scopes: ${scopes.join(', ')}`
            );
          } else {
            assert.ok(
              scopes.includes(expectedScope),
              `Line ${i + 1}, column ${column}: Expected token to have scope '${expectedScope}', but it doesn't. Scopes: ${scopes.join(', ')}`
            );
          }
        } else {
          assert.fail(`Line ${i + 1}, column ${column}: No token found at this position`);
        }
      }

      // Skip the assertion line in the next iteration
      i++;
    }
  }
}

// Find all assertions in a line
function findAssertions(line: string): Array<{ column: number, expectedScope: string, isNegative: boolean }> {
  const assertions: Array<{ column: number, expectedScope: string, isNegative: boolean }> = [];

  // Handle <--- style assertions (from start of line)
  const startMatch = line.match(/\/\/\s*<-+\s+(.*)/);
  if (startMatch) {
    const scope = startMatch[1].trim();
    const isNegative = scope.startsWith('- ');
    assertions.push({
      column: 0,
      expectedScope: isNegative ? scope.substring(2) : scope,
      isNegative: isNegative
    });
    return assertions;
  }

  // Handle <~- style assertions (specific offset)
  const offsetMatch = line.match(/\/\/\s*<~(\d+)-\s+(.*)/);
  if (offsetMatch) {
    const column = parseInt(offsetMatch[1], 10);
    const scope = offsetMatch[2].trim();
    const isNegative = scope.startsWith('- ');
    assertions.push({
      column,
      expectedScope: isNegative ? scope.substring(2) : scope,
      isNegative: isNegative
    });
    return assertions;
  }

  // Handle standard ^ assertions
  let match;
  const regex = /\^+\s+([^;]+)/g;
  while ((match = regex.exec(line)) !== null) {
    const startColumn = match.index;
    const scope = match[1].trim();
    const isNegative = scope.startsWith('- ');

    assertions.push({
      column: startColumn,
      expectedScope: isNegative ? scope.substring(2) : scope,
      isNegative: isNegative
    });
  }

  return assertions;
}

// Find the token at a specific column
function findTokenAtColumn(tokens: vsctm.IToken[], column: number): vsctm.IToken | undefined {
  for (const token of tokens) {
    if (column >= token.startIndex && column < token.endIndex) {
      return token;
    }
  }
  return undefined;
}

describe('TextMate Grammar Tests', () => {
  const testCasesDir = path.join(__dirname);
  const grammarPath = path.join(__dirname, '../syntaxes/solidity.tmLanguage.json');

  // Find all .syntax-test.sol files in the tests directory
  const testFiles = fs.readdirSync(testCasesDir)
    .filter(file => file.endsWith('.syntax-test.sol'))
    .map(file => path.join(testCasesDir, file));

  // Run tests for each test file
  for (const testFile of testFiles) {
    const relativePath = path.relative(__dirname, testFile);

    it(`should pass grammar tests in ${relativePath}`, async () => {
      const registry = await createRegistry(grammarPath);
      await runTest(registry, testFile);
    });
  }
});
