'use strict'; 
/** globals - const */
const vscode = require('vscode');
const languageId = "solidity";
const docSelector = {
    language: languageId
};

const DEFAULT_FINDFILES_EXCLUDES = '{**/node_modules,**/mock*,**/test*,**/migrations,**/Migrations.sol,**/flat_*.sol,**/console.sol},**/hevm.sol';
const DEFAULT_FINDFILES_EXCLUDES_ALLOWFLAT = '{**/node_modules,**/mock*,**/test*,**/migrations,**/Migrations.sol,**/console.sol},**/hevm.sol}';

function extensionConfig() {
    return vscode.workspace.getConfiguration('solidity-lang');
}

function extension() {
    return vscode.extensions.getExtension('contractshark.solidity-lang');
}

module.exports = {
    extensionConfig: extensionConfig,
    languageId: languageId,
    docSelector: docSelector,
    extension: extension,
    DEFAULT_FINDFILES_EXCLUDES: DEFAULT_FINDFILES_EXCLUDES,
    DEFAULT_FINDFILES_EXCLUDES_ALLOWFLAT: DEFAULT_FINDFILES_EXCLUDES_ALLOWFLAT
};
