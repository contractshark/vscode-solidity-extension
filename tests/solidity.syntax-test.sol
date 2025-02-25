// SYNTAX TEST "source.solidity" "Solidity Grammar Tests"

// Basic contract declarations
contract SimpleContract {
// <----- storage.type.contract
//        ^^^^^^^^^^^^^ entity.name.type.contract
//                      ^ punctuation.brace.curly.begin
}
// <- punctuation.brace.curly.end

// Contract with inheritance
contract ChildContract is ParentContract {
// <----- storage.type.contract
//        ^^^^^^^^^^^^^ entity.name.type.contract
//                      ^^ storage.modifier.is
//                         ^^^^^^^^^^^^^^ entity.name.type.contract.extend
}

// Multiple inheritance
contract MultiContract is Contract1, Contract2, Contract3 {
// <----- storage.type.contract
//        ^^^^^^^^^^^^^ entity.name.type.contract
//                      ^^ storage.modifier.is
//                         ^^^^^^^^^ entity.name.type.contract.extend
//                                  ^ punctuation.separator
//                                    ^^^^^^^^^ entity.name.type.contract.extend
//                                             ^ punctuation.separator
//                                               ^^^^^^^^^ entity.name.type.contract.extend
}

// Function declarations
function transfer(address to, uint256 amount) public returns (bool) {
// <----- storage.type.function
//        ^^^^^^^^ entity.name.function
//                ^ punctuation.parameters.begin
//                 ^^^^^^^ support.type.primitive
//                         ^^ variable.parameter.function
//                           ^ punctuation.separator
//                             ^^^^^^^ support.type.primitive
//                                     ^^^^^^ variable.parameter.function
//                                           ^ punctuation.parameters.end
//                                             ^^^^^^ storage.type.modifier.access
//                                                    ^^^^^^^ keyword.control.flow.return
//                                                            ^ punctuation.parameters.begin
//                                                             ^^^^ support.type.primitive
//                                                                 ^ punctuation.parameters.end
}

// Function with modifiers
function withdraw() public onlyOwner nonReentrant {
// <----- storage.type.function
//        ^^^^^^^^ entity.name.function
//                ^^ punctuation.parameters.begin punctuation.parameters.end
//                   ^^^^^^ storage.type.modifier.access
//                          ^^^^^^^^^ entity.name.function.modifier
//                                    ^^^^^^^^^^^ entity.name.function.modifier
}

// Function with view modifier
function getBalance() public view returns (uint256) {
// <----- storage.type.function
//        ^^^^^^^^^^ entity.name.function
//                  ^^ punctuation.parameters.begin punctuation.parameters.end
//                     ^^^^^^ storage.type.modifier.access
//                            ^^^^ storage.type.modifier.extendedscope
//                                 ^^^^^^^ keyword.control.flow.return
//                                         ^ punctuation.parameters.begin
//                                          ^^^^^^^ support.type.primitive
//                                                 ^ punctuation.parameters.end
}

// Constructor
constructor(string memory name) {
// <------- storage.type.constructor
//          ^^^^^^ support.type.primitive
//                 ^^^^^^ storage.type.modifier.extendedscope
//                        ^^^^ variable.parameter.function
}

// NatSpec documentation
/**
 * @title Test Contract
 * @dev This is a test
 */
// <- comment.block.documentation
//  ^ comment.block.documentation
//   ^^^^^^ storage.type.title.natspec
//          ^^^^ comment.block.documentation
//               ^^^^^^^^ comment.block.documentation
//  ^ comment.block.documentation
//   ^^^^ storage.type.dev.natspec
//        ^^^^ comment.block.documentation
//             ^^ comment.block.documentation
//                ^ comment.block.documentation
//                 ^^^^ comment.block.documentation

/// @param amount The amount to transfer
// <- comment.block.documentation
//  ^^^^^^ storage.type.param.natspec
//         ^^^^^^ variable.other.natspec
/// @return success Whether the transfer succeeded
// <- comment.block.documentation
//  ^^^^^^^ storage.type.return.natspec
//          ^^^^^^^ variable.other.natspec

// Line comments
// This is a line comment
// <- comment.line
//  ^^^^ comment.line
//       ^^ comment.line
//          ^ comment.line
//           ^^^^ comment.line
//                ^^^^^^^ comment.line

// Block comments
/* This is a block comment */
// <- comment.block
//  ^^^^ comment.block
//       ^^ comment.block
//          ^ comment.block
//           ^^^^^ comment.block
//                 ^^^^^^^ comment.block
//                         ^^ comment.block

// Primitive types
uint256 balance; address owner; bool isActive;
// <---- support.type.primitive
//       ^^^^^^^ variable.parameter.other
//              ^ punctuation.terminator.statement
//                ^^^^^^^ support.type.primitive
//                        ^^^^^ variable.parameter.other
//                             ^ punctuation.terminator.statement
//                               ^^^^ support.type.primitive
//                                    ^^^^^^^^ variable.parameter.other
//                                            ^ punctuation.terminator.statement

// Struct declaration
struct Person {
// <---- storage.type.struct
//      ^^^^^^ entity.name.type.struct
//             ^ punctuation.brace.curly.begin
    string name;
//  ^^^^^^ support.type.primitive
//         ^^^^ variable.parameter.other
//             ^ punctuation.terminator.statement
    uint256 age;
//  ^^^^^^^ support.type.primitive
//          ^^^ variable.parameter.other
//             ^ punctuation.terminator.statement
}
// <- punctuation.brace.curly.end

// Enum declaration
enum Status { Pending, Active, Cancelled }
// <-- storage.type.enum
//    ^^^^^^ entity.name.type.enum
//           ^ punctuation.brace.curly.begin
//             ^^^^^^^ variable.other.enummember
//                    ^ punctuation.separator
//                      ^^^^^^ variable.other.enummember
//                            ^ punctuation.separator
//                              ^^^^^^^^^ variable.other.enummember
//                                        ^ punctuation.brace.curly.end

// Mapping
mapping(address => uint256) balances;
// <---- storage.type.mapping
//      ^ punctuation.parameters.begin
//       ^^^^^^^ support.type.primitive
//               ^^ keyword.operator.mapping
//                  ^^^^^^^ support.type.primitive
//                         ^ punctuation.parameters.end
//                           ^^^^^^^^ variable.parameter.other
//                                   ^ punctuation.terminator.statement

// Control flow
if (amount > 0) { return true; }
// <- keyword.control.flow
//  ^ punctuation.parameters.begin
//   ^^^^^^ variable.parameter.other
//          ^ keyword.operator.logic
//            ^ constant.numeric.decimal
//             ^ punctuation.parameters.end
//               ^ punctuation.brace.curly.begin
//                 ^^^^^^ keyword.control.flow
//                        ^^^^ constant.language.boolean
//                            ^ punctuation.terminator.statement
//                              ^ punctuation.brace.curly.end

// For loop
for (uint i = 0; i < 10; i++) { sum += i; }
// <- keyword.control.flow
//   ^ punctuation.parameters.begin
//    ^^^^ support.type.primitive
//         ^ variable.parameter.other
//           ^ keyword.operator.assignment
//             ^ constant.numeric.decimal
//              ^ punctuation.terminator.statement
//                ^ variable.parameter.other
//                  ^ keyword.operator.logic
//                    ^^ constant.numeric.decimal
//                      ^ punctuation.terminator.statement
//                        ^ variable.parameter.other
//                         ^^ keyword.operator.arithmetic
//                           ^ punctuation.parameters.end
//                             ^ punctuation.brace.curly.begin
//                               ^^^ variable.parameter.other
//                                   ^^ keyword.operator.assignment
//                                      ^ variable.parameter.other
//                                       ^ punctuation.terminator.statement
//                                         ^ punctuation.brace.curly.end

// Require statement
require(amount > 0, "Amount must be positive");
// <---- keyword.control.exceptions
//      ^ punctuation.parameters.begin
//       ^^^^^^ variable.parameter.other
//              ^ keyword.operator.logic
//                ^ constant.numeric.decimal
//                 ^ punctuation.separator
//                   ^^^^^^^^^^^^^^^^^^^^^^^^ string.quoted.double
//                                           ^ punctuation.parameters.end
//                                            ^ punctuation.terminator.statement

// Import statements
import "./Token.sol";
// <--- keyword.control.import
//      ^^^^^^^^^^^^^ string.quoted.double
//                   ^ punctuation.terminator.statement

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// <--- keyword.control.import
//      ^ punctuation.brace.curly.begin
//       ^^^^^ entity.name.type.interface
//            ^ punctuation.brace.curly.end
//              ^^^^ keyword.control.import.from
//                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ string.quoted.double
//                                                            ^ punctuation.terminator.statement

// Event declaration
event Transfer(address indexed from, address indexed to, uint256 amount);
// <--- storage.type.event
//     ^^^^^^^^ entity.name.type.event
//             ^ punctuation.parameters.begin
//              ^^^^^^^ support.type.primitive
//                      ^^^^^^^ storage.type.modifier.indexed
//                              ^^^^ variable.parameter.event
//                                  ^ punctuation.separator
//                                    ^^^^^^^ support.type.primitive
//                                            ^^^^^^^ storage.type.modifier.indexed
//                                                    ^^ variable.parameter.event
//                                                      ^ punctuation.separator
//                                                        ^^^^^^^ support.type.primitive
//                                                                ^^^^^^ variable.parameter.event
//                                                                      ^ punctuation.parameters.end
//                                                                       ^ punctuation.terminator.statement

// Global variables
msg.sender.transfer(msg.value);
// <- variable.language.transaction
//  ^ punctuation.accessor
//   ^^^^^^ support.variable.property
//         ^ punctuation.accessor
//          ^^^^^^^^ entity.name.function
//                  ^ punctuation.parameters.begin
//                   ^^^ variable.language.transaction
//                      ^ punctuation.accessor
//                       ^^^^^ support.variable.property
//                            ^ punctuation.parameters.end
//                             ^ punctuation.terminator.statement

require(block.timestamp > deadline);
// <--- keyword.control.exceptions
//     ^ punctuation.parameters.begin
//      ^^^^^ variable.language.transaction
//           ^ punctuation.accessor
//            ^^^^^^^^^ support.variable.property
//                      ^ keyword.operator.logic
//                        ^^^^^^^^ variable.parameter.other
//                                ^ punctuation.parameters.end
//                                 ^ punctuation.terminator.statement

// Pragma directive
pragma solidity ^0.8.0;
// <--- keyword.control.pragma
//      ^^^^^^^^ entity.name.tag.pragma
//               ^^^^^ constant.other.pragma
//                    ^ punctuation.terminator.statement

// Error declaration
error InsufficientBalance(address account, uint256 balance, uint256 required);
// <-- storage.type.error
//    ^^^^^^^^^^^^^^^^^^^ entity.name.type.error
//                       ^ punctuation.parameters.begin
//                        ^^^^^^^ support.type.primitive
//                                ^^^^^^^ variable.parameter.function
//                                       ^ punctuation.separator
//                                         ^^^^^^^ support.type.primitive
//                                                 ^^^^^^^ variable.parameter.function
//                                                        ^ punctuation.separator
//                                                          ^^^^^^^ support.type.primitive
//                                                                  ^^^^^^^^ variable.parameter.function
//                                                                          ^ punctuation.parameters.end
//                                                                           ^ punctuation.terminator.statement

// User-defined type
type Amount is uint256;
// <- storage.type.user-type
//   ^^^^^^ entity.name.type.user-type
//          ^^ keyword.operator.user-type
//             ^^^^^^^ support.type.primitive
//                    ^ punctuation.terminator.statement

// Numeric literals
uint256 amount = 1000;
// <---- support.type.primitive
//       ^^^^^^ variable.parameter.other
//              ^ keyword.operator.assignment
//                ^^^^ constant.numeric.decimal
//                    ^ punctuation.terminator.statement

bytes32 hash = 0xabcdef1234567890;
// <---- support.type.primitive
//       ^^^^ variable.parameter.other
//            ^ keyword.operator.assignment
//              ^^^^^^^^^^^^^^^^^^^ constant.numeric.hexadecimal
//                                 ^ punctuation.terminator.statement

uint256 large = 1.5e18;
// <---- support.type.primitive
//       ^^^^^ variable.parameter.other
//             ^ keyword.operator.assignment
//               ^^^^^^ constant.numeric.scientific
//                     ^ punctuation.terminator.statement

// String literals
string memory name = "Solidity";
// <--- support.type.primitive
//     ^^^^^^ storage.type.modifier.extendedscope
//            ^^^^ variable.parameter.other
//                 ^ keyword.operator.assignment
//                   ^^^^^^^^^^ string.quoted.double
//                             ^ punctuation.terminator.statement

string memory symbol = 'SOL';
// <--- support.type.primitive
//     ^^^^^^ storage.type.modifier.extendedscope
//            ^^^^^^ variable.parameter.other
//                   ^ keyword.operator.assignment
//                     ^^^^^ string.quoted.single
//                          ^ punctuation.terminator.statement

// Assembly block
assembly {
// <----- keyword.control.assembly
//        ^ punctuation.brace.curly.begin
    let x := mload(0x40)
//  ^^^ storage.type.assembly
//      ^ variable.parameter.other
//        ^^ keyword.operator.assignment
//           ^^^^^ entity.name.function
//                ^ punctuation.parameters.begin
//                 ^^^^ constant.numeric.hexadecimal
//                     ^ punctuation.parameters.end
}
// <- punctuation.brace.curly.end

// Boolean constants
bool public initialized = true;
// <- support.type.primitive
//   ^^^^^^ storage.type.modifier.access
//          ^^^^^^^^^^^ variable.parameter.other
//                      ^ keyword.operator.assignment
//                        ^^^^ constant.language.boolean
//                            ^ punctuation.terminator.statement

// Time constants
uint256 lockTime = 3 days;
// <---- support.type.primitive
//       ^^^^^^^^ variable.parameter.other
//                ^ keyword.operator.assignment
//                  ^ constant.numeric.decimal
//                    ^^^^ constant.language.time
//                        ^ punctuation.terminator.statement

// Currency constants
uint256 price = 1 ether;
// <---- support.type.primitive
//       ^^^^^ variable.parameter.other
//             ^ keyword.operator.assignment
//               ^ constant.numeric.decimal
//                 ^^^^^ constant.language.currency
//                      ^ punctuation.terminator.statement

// Modifier declaration
modifier onlyOwner() {
// <----- storage.type.function.modifier
//        ^^^^^^^^^ entity.name.function.modifier
//                 ^^ punctuation.parameters.begin punctuation.parameters.end
//                    ^ punctuation.brace.curly.begin
    require(msg.sender == owner);
//  ^^^^^^^ keyword.control.exceptions
//         ^ punctuation.parameters.begin
//          ^^^ variable.language.transaction
//             ^ punctuation.accessor
//              ^^^^^^ support.variable.property
//                     ^^ keyword.operator.logic
//                        ^^^^^ variable.parameter.other
//                             ^ punctuation.parameters.end
//                              ^ punctuation.terminator.statement
    _;
//  ^^ constant.other.underscore
//    ^ punctuation.terminator.statement
}
// <- punctuation.brace.curly.end

// Interface declaration
interface IERC20 {
// <------ storage.type.interface
//         ^^^^^^ entity.name.type.interface
//                ^ punctuation.brace.curly.begin
    function balanceOf(address account) external view returns (uint256);
//  ^^^^^^^^ storage.type.function
//           ^^^^^^^^^ entity.name.function
//                    ^ punctuation.parameters.begin
//                     ^^^^^^^ support.type.primitive
//                             ^^^^^^^ variable.parameter.function
//                                    ^ punctuation.parameters.end
//                                      ^^^^^^^^ storage.type.modifier.extendedscope
//                                               ^^^^ storage.type.modifier.extendedscope
//                                                    ^^^^^^^ keyword.control.flow.return
//                                                            ^ punctuation.parameters.begin
//                                                             ^^^^^^^ support.type.primitive
//                                                                    ^ punctuation.parameters.end
//                                                                     ^ punctuation.terminator.statement
}
// <- punctuation.brace.curly.end

// Interface inheritance
interface IToken is IERC20, IERC721 {
// <------ storage.type.interface
//         ^^^^^^ entity.name.type.interface
//                ^^ storage.modifier.is
//                   ^^^^^^ entity.name.type.interface.extend
//                         ^ punctuation.separator
//                           ^^^^^^^ entity.name.type.interface.extend
//                                   ^ punctuation.brace.curly.begin
}
// <- punctuation.brace.curly.end

// Library declaration
library SafeMath {
// <----- storage.type.library
//        ^^^^^^^^ entity.name.type.library
//                 ^ punctuation.brace.curly.begin
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
//  ^^^^^^^^ storage.type.function
//           ^^^ entity.name.function
//              ^ punctuation.parameters.begin
//               ^^^^^^^ support.type.primitive
//                       ^ variable.parameter.function
//                        ^ punctuation.separator
//                          ^^^^^^^ support.type.primitive
//                                  ^ variable.parameter.function
//                                   ^ punctuation.parameters.end
//                                     ^^^^^^^^ storage.type.modifier.access
//                                              ^^^^ storage.type.modifier.extendedscope
//                                                   ^^^^^^^ keyword.control.flow.return
//                                                           ^ punctuation.parameters.begin
//                                                            ^^^^^^^ support.type.primitive
//                                                                   ^ punctuation.parameters.end
//                                                                     ^ punctuation.brace.curly.begin
        return a + b;
//      ^^^^^^ keyword.control.flow
//             ^ variable.parameter.other
//               ^ keyword.operator.arithmetic
//                 ^ variable.parameter.other
//                  ^ punctuation.terminator.statement
    }
//  ^ punctuation.brace.curly.end
}
// <- punctuation.brace.curly.end

// Complete contract example
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// <---- keyword.control.pragma
//      ^^^^^^^^ entity.name.tag.pragma
//               ^^^^^ constant.other.pragma
//                    ^ punctuation.terminator.statement

/**
 * @title ERC20 Token
 * @dev Implementation of the ERC20 Token Standard
 */
// <- comment.block.documentation
//  ^ comment.block.documentation
//   ^^^^^^ storage.type.title.natspec
//          ^^^^^^^^^^^ comment.block.documentation
//  ^ comment.block.documentation
//   ^^^^ storage.type.dev.natspec
//        ^^^^^^^^^^^^^^^ comment.block.documentation
//                        ^^ comment.block.documentation
//                           ^^^^^^^^^^^ comment.block.documentation
contract ERC20 {
// <----- storage.type.contract
//        ^^^^^ entity.name.type.contract
//              ^ punctuation.brace.curly.begin
    string public name;
//  ^^^^^^ support.type.primitive
//         ^^^^^^ storage.type.modifier.access
//                ^^^^ variable.parameter.other
//                    ^ punctuation.terminator.statement
    string public symbol;
//  ^^^^^^ support.type.primitive
//         ^^^^^^ storage.type.modifier.access
//                ^^^^^^ variable.parameter.other
//                      ^ punctuation.terminator.statement
    uint8 public decimals;
//  ^^^^^ support.type.primitive
//        ^^^^^^ storage.type.modifier.access
//               ^^^^^^^^ variable.parameter.other
//                       ^ punctuation.terminator.statement
    uint256 public totalSupply;
//  ^^^^^^^ support.type.primitive
//          ^^^^^^ storage.type.modifier.access
//                 ^^^^^^^^^^^ variable.parameter.other
//                            ^ punctuation.terminator.statement

    mapping(address => uint256) private _balances;
//  ^^^^^^^ storage.type.mapping
//         ^ punctuation.parameters.begin
//          ^^^^^^^ support.type.primitive
//                  ^^ keyword.operator.mapping
//                     ^^^^^^^ support.type.primitive
//                            ^ punctuation.parameters.end
//                              ^^^^^^^ storage.type.modifier.access
//                                      ^^^^^^^^^ variable.parameter.other
//                                               ^ punctuation.terminator.statement
    mapping(address => mapping(address => uint256)) private _allowances;
//  ^^^^^^^ storage.type.mapping
//         ^ punctuation.parameters.begin
//          ^^^^^^^ support.type.primitive
//                  ^^ keyword.operator.mapping
//                     ^^^^^^^ storage.type.mapping
//                            ^ punctuation.parameters.begin
//                             ^^^^^^^ support.type.primitive
//                                     ^^ keyword.operator.mapping
//                                        ^^^^^^^ support.type.primitive
//                                               ^ punctuation.parameters.end
//                                                ^ punctuation.parameters.end
//                                                  ^^^^^^^ storage.type.modifier.access
//                                                          ^^^^^^^^^^^ variable.parameter.other
//                                                                     ^ punctuation.terminator.statement

    event Transfer(address indexed from, address indexed to, uint256 value);
//  ^^^^^ storage.type.event
//        ^^^^^^^^ entity.name.type.event
//                ^ punctuation.parameters.begin
//                 ^^^^^^^ support.type.primitive
//                         ^^^^^^^ storage.type.modifier.indexed
//                                 ^^^^ variable.parameter.event
//                                     ^ punctuation.separator
//                                       ^^^^^^^ support.type.primitive
//                                               ^^^^^^^ storage.type.modifier.indexed
//                                                       ^^ variable.parameter.event
//                                                         ^ punctuation.separator
//                                                           ^^^^^^^ support.type.primitive
//                                                                   ^^^^^ variable.parameter.event
//                                                                        ^ punctuation.parameters.end
//                                                                         ^ punctuation.terminator.statement
    event Approval(address indexed owner, address indexed spender, uint256 value);
//  ^^^^^ storage.type.event
//        ^^^^^^^^ entity.name.type.event
//                ^ punctuation.parameters.begin
//                 ^^^^^^^ support.type.primitive
//                         ^^^^^^^ storage.type.modifier.indexed
//                                 ^^^^^ variable.parameter.event
//                                      ^ punctuation.separator
//                                        ^^^^^^^ support.type.primitive
//                                                ^^^^^^^ storage.type.modifier.indexed
//                                                        ^^^^^^^ variable.parameter.event
//                                                               ^ punctuation.separator
//                                                                 ^^^^^^^ support.type.primitive
//                                                                         ^^^^^ variable.parameter.event
//                                                                              ^ punctuation.parameters.end
//                                                                               ^ punctuation.terminator.statement

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
//  ^^^^^^^^^^^ storage.type.constructor
//             ^ punctuation.parameters.begin
//              ^^^^^^ support.type.primitive
//                     ^^^^^^ storage.type.modifier.extendedscope
//                            ^^^^^ variable.parameter.function
//                                 ^ punctuation.separator
//                                   ^^^^^^ support.type.primitive
//                                          ^^^^^^ storage.type.modifier.extendedscope
//                                                 ^^^^^^^ variable.parameter.function
//                                                        ^ punctuation.separator
//                                                          ^^^^^ support.type.primitive
//                                                                ^^^^^^^^^ variable.parameter.function
//                                                                         ^ punctuation.parameters.end
//                                                                           ^ punctuation.brace.curly.begin
        name = _name;
//      ^^^^ variable.parameter.other
//           ^ keyword.operator.assignment
//             ^^^^^ variable.parameter.other
//                  ^ punctuation.terminator.statement
        symbol = _symbol;
//      ^^^^^^ variable.parameter.other
//             ^ keyword.operator.assignment
//               ^^^^^^^ variable.parameter.other
//                      ^ punctuation.terminator.statement
        decimals = _decimals;
//      ^^^^^^^^ variable.parameter.other
//               ^ keyword.operator.assignment
//                 ^^^^^^^^^ variable.parameter.other
//                          ^ punctuation.terminator.statement
    }
//  ^ punctuation.brace.curly.end

    function balanceOf(address account) public view returns (uint256) {
//  ^^^^^^^^ storage.type.function
//           ^^^^^^^^^ entity.name.function
//                    ^ punctuation.parameters.begin
//                     ^^^^^^^ support.type.primitive
//                             ^^^^^^^ variable.parameter.function
//                                    ^ punctuation.parameters.end
//                                      ^^^^^^ storage.type.modifier.access
//                                             ^^^^ storage.type.modifier.extendedscope
//                                                  ^^^^^^^ keyword.control.flow.return
//                                                          ^ punctuation.parameters.begin
//                                                           ^^^^^^^ support.type.primitive
//                                                                  ^ punctuation.parameters.end
//                                                                    ^ punctuation.brace.curly.begin
        return _balances[account];
//      ^^^^^^ keyword.control.flow
//             ^^^^^^^^^ variable.parameter.other
//                      ^ punctuation.brace.square.begin
//                       ^^^^^^^ variable.parameter.other
//                              ^ punctuation.brace.square.end
//                               ^ punctuation.terminator.statement
    }
//  ^ punctuation.brace.curly.end

    function transfer(address to, uint256 amount) public returns (bool) {
//  ^^^^^^^^ storage.type.function
//           ^^^^^^^^ entity.name.function
//                   ^ punctuation.parameters.begin
//                    ^^^^^^^ support.type.primitive
//                            ^^ variable.parameter.function
//                              ^ punctuation.separator
//                                ^^^^^^^ support.type.primitive
//                                        ^^^^^^ variable.parameter.function
//                                              ^ punctuation.parameters.end
//                                                ^^^^^^ storage.type.modifier.access
//                                                       ^^^^^^^ keyword.control.flow.return
//                                                               ^ punctuation.parameters.begin
//                                                                ^^^^ support.type.primitive
//                                                                    ^ punctuation.parameters.end
//                                                                      ^ punctuation.brace.curly.begin
        require(to != address(0), "ERC20: transfer to the zero address");
//      ^^^^^^^ keyword.control.exceptions
//             ^ punctuation.parameters.begin
//              ^^ variable.parameter.other
//                 ^^ keyword.operator.logic
//                    ^^^^^^^ support.type.primitive
//                           ^ punctuation.parameters.begin
//                            ^ constant.numeric.decimal
//                             ^ punctuation.parameters.end
//                              ^ punctuation.separator
//                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ string.quoted.double
//                                                                    ^ punctuation.parameters.end
//                                                                     ^ punctuation.terminator.statement
        require(_balances[msg.sender] >= amount, "ERC20: insufficient balance");
//      ^^^^^^^ keyword.control.exceptions
//             ^ punctuation.parameters.begin
//              ^^^^^^^^^ variable.parameter.other
//                       ^ punctuation.brace.square.begin
//                        ^^^ variable.language.transaction
//                           ^ punctuation.accessor
//                            ^^^^^^ support.variable.property
//                                  ^ punctuation.brace.square.end
//                                    ^^ keyword.operator.logic
//                                       ^^^^^^ variable.parameter.other
//                                             ^ punctuation.separator
//                                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ string.quoted.double
//                                                                            ^ punctuation.parameters.end
//                                                                             ^ punctuation.terminator.statement

        _balances[msg.sender] -= amount;
//      ^^^^^^^^^ variable.parameter.other
//               ^ punctuation.brace.square.begin
//                ^^^ variable.language.transaction
//                   ^ punctuation.accessor
//                    ^^^^^^ support.variable.property
//                          ^ punctuation.brace.square.end
//                            ^^ keyword.operator.assignment
//                               ^^^^^^ variable.parameter.other
//                                     ^ punctuation.terminator.statement
        _balances[to] += amount;
//      ^^^^^^^^^ variable.parameter.other
//               ^ punctuation.brace.square.begin
//                ^^ variable.parameter.other
//                  ^ punctuation.brace.square.end
//                    ^^ keyword.operator.assignment
//                       ^^^^^^ variable.parameter.other
//                             ^ punctuation.terminator.statement

        emit Transfer(msg.sender, to, amount);
//      ^^^^ keyword.control
//           ^^^^^^^^ entity.name.type.event
//                   ^ punctuation.parameters.begin
//                    ^^^ variable.language.transaction
//                       ^ punctuation.accessor
//                        ^^^^^^ support.variable.property
//                              ^ punctuation.separator
//                                ^^ variable.parameter.other
//                                  ^ punctuation.separator
//                                    ^^^^^^ variable.parameter.other
//                                          ^ punctuation.parameters.end
//                                           ^ punctuation.terminator.statement
        return true;
//      ^^^^^^ keyword.control.flow
//             ^^^^ constant.language.boolean
//                 ^ punctuation.terminator.statement
    }
//  ^ punctuation.brace.curly.end
}
// <- punctuation.brace.curly.end
