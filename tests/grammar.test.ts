import * as path from 'node:path';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import { describe, it, before } from 'node:test';


const getGrammarPath = () => path.join(__dirname, '../../syntaxes/solidity.tmLanguage.json');

describe('Solidity Grammar Tests', () => {
  let registry: any;
  let grammar: any;


  describe('Contract declarations', () => {
    it('should tokenize basic contract declarations', async () => {
      const source = 'contract SimpleContract {}';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.contract'), true);
      assert.strictEqual(result.tokens[0][1].scopes.includes('entity.name.type.contract'), true);
    });

    it('should tokenize contract declarations with inheritance', async () => {
      const source = 'contract ChildContract is ParentContract {}';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.contract'), true);
      assert.strictEqual(result.tokens[0][1].scopes.includes('entity.name.type.contract'), true);
      assert.strictEqual(result.tokens[0][2].scopes.includes('storage.modifier.is'), true);
      assert.strictEqual(result.tokens[0][3].scopes.includes('entity.name.type.contract.extend'), true);
    });

    it('should tokenize multiple inheritance contracts', async () => {
      const source = 'contract MultiContract is Contract1, Contract2, Contract3 {}';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.contract'), true);
      assert.strictEqual(result.tokens[0][1].scopes.includes('entity.name.type.contract'), true);
      assert.strictEqual(result.tokens[0][2].scopes.includes('storage.modifier.is'), true);
      // Check first parent contract
      assert.strictEqual(result.tokens[0][3].scopes.includes('entity.name.type.contract.extend'), true);
    });
  });

  describe('Function declarations', () => {
    it('should tokenize function declarations', async () => {
      const source = 'function transfer(address to, uint256 amount) public returns (bool) {}';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.function'), true);
      assert.strictEqual(result.tokens[0][1].scopes.includes('entity.name.function'), true);
    });

    it('should tokenize function modifiers', async () => {
      const source = 'function withdraw() public onlyOwner nonReentrant {}';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.function'), true);
      assert.strictEqual(result.tokens[0][1].scopes.includes('entity.name.function'), true);
      assert.strictEqual(result.tokens[0][3].scopes.includes('storage.type.modifier.access'), true);
    });

    it('should tokenize view and pure modifiers', async () => {
      const source = 'function getBalance() public view returns (uint256) {}';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.function'), true);
      assert.strictEqual(result.tokens[0][3].scopes.includes('storage.type.modifier.access'), true);
      // Find the 'view' token
      const viewToken = result.tokens[0].find(token =>
        token.content === 'view' && token.scopes.includes('storage.type.modifier.extendedscope'));
      assert.notStrictEqual(viewToken, undefined);
    });

    it('should tokenize constructor', async () => {
      const source = 'constructor(string memory name) {}';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.constructor'), true);
    });
  });

  describe('Natspec documentation', () => {
    it('should tokenize block natspec comments', async () => {
      const source = `/**
 * @title Test Contract
 * @dev This is a test
 */`;
      const result = await registry.tokenize(source);

      // Check if it's recognized as documentation
      assert.strictEqual(result.tokens[0][0].scopes.includes('comment.block.documentation'), true);

      // Look for title tag
      const titleTagLine = result.tokens.find(line =>
        line.some(token => token.content === '@title' && token.scopes.includes('storage.type.title.natspec')));
      assert.notStrictEqual(titleTagLine, undefined);
    });

    it('should tokenize line natspec comments', async () => {
      const source = `/// @param amount The amount to transfer
/// @return success Whether the transfer succeeded`;
      const result = await registry.tokenize(source);

      // Check if first line is recognized as documentation
      assert.strictEqual(result.tokens[0][0].scopes.includes('comment.block.documentation'), true);

      // Check if param tag is recognized
      const paramToken = result.tokens[0].find(token =>
        token.content === '@param' && token.scopes.includes('storage.type.param.natspec'));
      assert.notStrictEqual(paramToken, undefined);

      // Check if return tag is recognized
      const returnTagLine = result.tokens.find(line =>
        line.some(token => token.content === '@return' && token.scopes.includes('storage.type.return.natspec')));
      assert.notStrictEqual(returnTagLine, undefined);
    });
  });

  describe('Type declarations', () => {
    it('should tokenize primitive types', async () => {
      const source = 'uint256 balance; address owner; bool isActive;';
      const result = await registry.tokenize(source);

      const uint256Token = result.tokens[0].find(token =>
        token.content === 'uint256' && token.scopes.includes('support.type.primitive'));
      assert.notStrictEqual(uint256Token, undefined);

      const addressToken = result.tokens[0].find(token =>
        token.content === 'address' && token.scopes.includes('support.type.primitive'));
      assert.notStrictEqual(addressToken, undefined);

      const boolToken = result.tokens[0].find(token =>
        token.content === 'bool' && token.scopes.includes('support.type.primitive'));
      assert.notStrictEqual(boolToken, undefined);
    });

    it('should tokenize user-defined types', async () => {
      const source = `struct Person {
    string name;
    uint256 age;
}`;
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.struct'), true);
      assert.strictEqual(result.tokens[0][1].scopes.includes('entity.name.type.struct'), true);
    });

    it('should tokenize enums', async () => {
      const source = `enum Status { Pending, Active, Cancelled }`;
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('storage.type.enum'), true);
      assert.strictEqual(result.tokens[0][1].scopes.includes('entity.name.type.enum'), true);

      // Check enum members
      const pendingToken = result.tokens[0].find(token =>
        token.content === 'Pending' && token.scopes.includes('variable.other.enummember'));
      assert.notStrictEqual(pendingToken, undefined);
    });

    it('should tokenize mappings', async () => {
      const source = 'mapping(address => uint256) balances;';
      const result = await registry.tokenize(source);

      const mappingToken = result.tokens[0].find(token =>
        token.content === 'mapping' && token.scopes.includes('storage.type.mapping'));
      assert.notStrictEqual(mappingToken, undefined);
    });
  });

  describe('Control flow', () => {
    it('should tokenize if statements', async () => {
      const source = 'if (amount > 0) { return true; }';
      const result = await registry.tokenize(source);

      const ifToken = result.tokens[0].find(token =>
        token.content === 'if' && token.scopes.includes('keyword.control.flow'));
      assert.notStrictEqual(ifToken, undefined);
    });

    it('should tokenize for loops', async () => {
      const source = 'for (uint i = 0; i < 10; i++) { sum += i; }';
      const result = await registry.tokenize(source);

      const forToken = result.tokens[0].find(token =>
        token.content === 'for' && token.scopes.includes('keyword.control.flow'));
      assert.notStrictEqual(forToken, undefined);
    });

    it('should tokenize require statements', async () => {
      const source = 'require(amount > 0, "Amount must be positive");';
      const result = await registry.tokenize(source);

      const requireToken = result.tokens[0].find(token =>
        token.content === 'require' && token.scopes.includes('keyword.control.exceptions'));
      assert.notStrictEqual(requireToken, undefined);
    });
  });

  describe('Import statements', () => {
    it('should tokenize simple imports', async () => {
      const source = 'import "./Token.sol";';
      const result = await registry.tokenize(source);

      const importToken = result.tokens[0].find(token =>
        token.content === 'import' && token.scopes.includes('keyword.control.import'));
      assert.notStrictEqual(importToken, undefined);
    });

    it('should tokenize named imports', async () => {
      const source = 'import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";';
      const result = await registry.tokenize(source);

      const importToken = result.tokens[0].find(token =>
        token.content === 'import' && token.scopes.includes('keyword.control.import'));
      assert.notStrictEqual(importToken, undefined);

      const fromToken = result.tokens[0].find(token =>
        token.content === 'from' && token.scopes.includes('keyword.control.import.from'));
      assert.notStrictEqual(fromToken, undefined);
    });
  });

  describe('Events', () => {
    it('should tokenize event declarations', async () => {
      const source = 'event Transfer(address indexed from, address indexed to, uint256 amount);';
      const result = await registry.tokenize(source);

      const eventToken = result.tokens[0].find(token =>
        token.content === 'event' && token.scopes.includes('storage.type.event'));
      assert.notStrictEqual(eventToken, undefined);

      const transferToken = result.tokens[0].find(token =>
        token.content === 'Transfer' && token.scopes.includes('entity.name.type.event'));
      assert.notStrictEqual(transferToken, undefined);

      const indexedToken = result.tokens[0].find(token =>
        token.content === 'indexed' && token.scopes.includes('storage.type.modifier.indexed'));
      assert.notStrictEqual(indexedToken, undefined);
    });
  });

  describe('Comments', () => {
    it('should tokenize line comments', async () => {
      const source = '// This is a line comment';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('comment.line'), true);
    });

    it('should tokenize block comments', async () => {
      const source = '/* This is a block comment */';
      const result = await registry.tokenize(source);

      assert.strictEqual(result.tokens[0][0].scopes.includes('comment.block'), true);
    });
  });

  describe('Global variables', () => {
    it('should tokenize msg variables', async () => {
      const source = 'msg.sender.transfer(msg.value);';
      const result = await registry.tokenize(source);

      const msgSenderToken = result.tokens[0].find(token =>
        token.content === 'msg' && token.scopes.includes('variable.language.transaction'));
      assert.notStrictEqual(msgSenderToken, undefined);
    });

    it('should tokenize block variables', async () => {
      const source = 'require(block.timestamp > deadline);';
      const result = await registry.tokenize(source);

      const blockToken = result.tokens[0].find(token =>
        token.content === 'block' && token.scopes.includes('variable.language.transaction'));
      assert.notStrictEqual(blockToken, undefined);
    });
  });

  describe('Pragma directives', () => {
    it('should tokenize pragma statements', async () => {
      const source = 'pragma solidity ^0.8.0;';
      const result = await registry.tokenize(source);

      const pragmaToken = result.tokens[0].find(token =>
        token.content === 'pragma' && token.scopes.includes('keyword.control.pragma'));
      assert.notStrictEqual(pragmaToken, undefined);

      const solidityToken = result.tokens[0].find(token =>
        token.content === 'solidity' && token.scopes.includes('entity.name.tag.pragma'));
      assert.notStrictEqual(solidityToken, undefined);

      const versionToken = result.tokens[0].find(token =>
        token.content === '^0.8.0' && token.scopes.includes('constant.other.pragma'));
      assert.notStrictEqual(versionToken, undefined);
    });
  });

  describe('Error declarations', () => {
    it('should tokenize custom errors', async () => {
      const source = 'error InsufficientBalance(address account, uint256 balance, uint256 required);';
      const result = await registry.tokenize(source);

      const errorToken = result.tokens[0].find(token =>
        token.content === 'error' && token.scopes.includes('storage.type.error'));
      assert.notStrictEqual(errorToken, undefined);

      const errorNameToken = result.tokens[0].find(token =>
        token.content === 'InsufficientBalance' && token.scopes.includes('entity.name.type.error'));
      assert.notStrictEqual(errorNameToken, undefined);
    });
  });

  describe('User-defined types', () => {
    it('should tokenize user-defined type declarations', async () => {
      const source = 'type Amount is uint256;';
      const result = await registry.tokenize(source);

      const typeToken = result.tokens[0].find(token =>
        token.content === 'type' && token.scopes.includes('storage.type.user-type'));
      assert.notStrictEqual(typeToken, undefined);

      const nameToken = result.tokens[0].find(token =>
        token.content === 'Amount' && token.scopes.includes('entity.name.type.user-type'));
      assert.notStrictEqual(nameToken, undefined);

      const isToken = result.tokens[0].find(token =>
        token.content === 'is' && token.scopes.includes('keyword.operator.user-type'));
      assert.notStrictEqual(isToken, undefined);
    });
  });

  describe('Numeric literals', () => {
    it('should tokenize decimal numbers', async () => {
      const source = 'uint256 amount = 1000;';
      const result = await registry.tokenize(source);

      const numberToken = result.tokens[0].find(token =>
        token.content === '1000' && token.scopes.includes('constant.numeric.decimal'));
      assert.notStrictEqual(numberToken, undefined);
    });

    it('should tokenize hex numbers', async () => {
      const source = 'bytes32 hash = 0xabcdef1234567890;';
      const result = await registry.tokenize(source);

      const hexToken = result.tokens[0].find(token =>
        token.content === '0xabcdef1234567890' && token.scopes.includes('constant.numeric.hexadecimal'));
      assert.notStrictEqual(hexToken, undefined);
    });

    it('should tokenize scientific notation', async () => {
      const source = 'uint256 large = 1.5e18;';
      const result = await registry.tokenize(source);

      const scientificToken = result.tokens[0].find(token =>
        token.content === '1.5e18' && token.scopes.includes('constant.numeric.scientific'));
      assert.notStrictEqual(scientificToken, undefined);
    });
  });

  describe('String literals', () => {
    it('should tokenize double-quoted strings', async () => {
      const source = 'string memory name = "Solidity";';
      const result = await registry.tokenize(source);

      const stringToken = result.tokens[0].find(token =>
        token.content === '"Solidity"' && token.scopes.includes('string.quoted.double'));
      assert.notStrictEqual(stringToken, undefined);
    });

    it('should tokenize single-quoted strings', async () => {
      const source = "string memory symbol = 'SOL';";
      const result = await registry.tokenize(source);

      const stringToken = result.tokens[0].find(token =>
        token.content === "'SOL'" && token.scopes.includes('string.quoted.single'));
      assert.notStrictEqual(stringToken, undefined);
    });
  });

  describe('Assembly blocks', () => {
    it('should tokenize assembly keywords', async () => {
      const source = `assembly {
        let x := mload(0x40)
      }`;
      const result = await registry.tokenize(source);

      const assemblyToken = result.tokens[0].find(token =>
        token.content === 'assembly' && token.scopes.includes('keyword.control.assembly'));
      assert.notStrictEqual(assemblyToken, undefined);

      const letToken = result.tokens[1].find(token =>
        token.content === 'let' && token.scopes.includes('storage.type.assembly'));
      assert.notStrictEqual(letToken, undefined);
    });
  });

  describe('Constant declarations', () => {
    it('should tokenize boolean constants', async () => {
      const source = 'bool public initialized = true;';
      const result = await registry.tokenize(source);

      const trueToken = result.tokens[0].find(token =>
        token.content === 'true' && token.scopes.includes('constant.language.boolean'));
      assert.notStrictEqual(trueToken, undefined);
    });

    it('should tokenize time constants', async () => {
      const source = 'uint256 lockTime = 3 days;';
      const result = await registry.tokenize(source);

      const daysToken = result.tokens[0].find(token =>
        token.content === 'days' && token.scopes.includes('constant.language.time'));
      assert.notStrictEqual(daysToken, undefined);
    });

    it('should tokenize currency constants', async () => {
      const source = 'uint256 price = 1 ether;';
      const result = await registry.tokenize(source);

      const etherToken = result.tokens[0].find(token =>
        token.content === 'ether' && token.scopes.includes('constant.language.currency'));
      assert.notStrictEqual(etherToken, undefined);
    });
  });

  describe('Modifiers declaration', () => {
    it('should tokenize modifier declarations', async () => {
      const source = 'modifier onlyOwner() { require(msg.sender == owner); _; }';
      const result = await registry.tokenize(source);

      const modifierToken = result.tokens[0].find(token =>
        token.content === 'modifier' && token.scopes.includes('storage.type.function.modifier'));
      assert.notStrictEqual(modifierToken, undefined);

      const nameToken = result.tokens[0].find(token =>
        token.content === 'onlyOwner' && token.scopes.includes('entity.name.function.modifier'));
      assert.notStrictEqual(nameToken, undefined);
    });
  });

  describe('Interface declarations', () => {
    it('should tokenize interface declarations', async () => {
      const source = 'interface IERC20 { function balanceOf(address account) external view returns (uint256); }';
      const result = await registry.tokenize(source);

      const interfaceToken = result.tokens[0].find(token =>
        token.content === 'interface' && token.scopes.includes('storage.type.interface'));
      assert.notStrictEqual(interfaceToken, undefined);

      const nameToken = result.tokens[0].find(token =>
        token.content === 'IERC20' && token.scopes.includes('entity.name.type.interface'));
      assert.notStrictEqual(nameToken, undefined);
    });

    it('should tokenize interface inheritance', async () => {
      const source = 'interface IToken is IERC20, IERC721 {}';
      const result = await registry.tokenize(source);

      const interfaceToken = result.tokens[0].find(token =>
        token.content === 'interface' && token.scopes.includes('storage.type.interface'));
      assert.notStrictEqual(interfaceToken, undefined);

      const isToken = result.tokens[0].find(token =>
        token.content === 'is' && token.scopes.includes('storage.modifier.is'));
      assert.notStrictEqual(isToken, undefined);
    });
  });

  describe('Library declarations', () => {
    it('should tokenize library declarations', async () => {
      const source = 'library SafeMath { function add(uint256 a, uint256 b) internal pure returns (uint256) { return a + b; } }';
      const result = await registry.tokenize(source);

      const libraryToken = result.tokens[0].find(token =>
        token.content === 'library' && token.scopes.includes('storage.type.library'));
      assert.notStrictEqual(libraryToken, undefined);

      const nameToken = result.tokens[0].find(token =>
        token.content === 'SafeMath' && token.scopes.includes('entity.name.type.library'));
      assert.notStrictEqual(nameToken, undefined);
    });
  });

  describe('Snapshot tests', () => {
    it('should correctly tokenize a complete contract example', async () => {
      const source = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ERC20 Token
 * @dev Implementation of the ERC20 Token Standard
 */
contract ERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(_balances[msg.sender] >= amount, "ERC20: insufficient balance");

        _balances[msg.sender] -= amount;
        _balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
        return true;
    }
}`;

      // Use snapshot testing to verify the entire tokenization
      const result = await registry.tokenize(source);

      // Save the snapshot
      const actualContent = JSON.stringify(result, null, 2);
      const expectedContent = await fs.promises.readFile(path.join(__dirname, '../__snapshots__/erc20.snap.json'), 'utf-8');

      assert.strictEqual(actualContent, expectedContent);
    });  });
});
