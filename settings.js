/**
* @configuration Solidity
* @exports LANGUAGE_ID
*/

'use strict';
const vscode = require('vscode');

const LANGUAGE_ID = "solidity";

function extensionConfig() {
    return vscode.workspace.getConfiguration(LANGUAGE_ID);
}

module.exports = {
    LANGUAGE_ID: LANGUAGE_ID,
    extensionConfig: extensionConfig
};
