// SPDX-License-Identifier: MIT
'use strict';
const vscode = require("vscode");

//const mod_deco = require("./features/deco.js");
//const mod_signatures = require("./features/signatures.js");
//const mod_hover = require("./features/hover/hover.js");
//const mod_compile = require("./features/compile.js");
const settings = require("./settings");
/** global vars */
var activeEditor;


/** event funcs */
async function onDidSave(document) {
    if (document.languageId != settings.LANGUAGE_ID) {
        console.log("warning ~ LanguageId mismatch");
        return;
    }

    //always run on save
    if (settings.extensionConfig().compile.onSave) {
        mod_compile.compileContractCommand(document);
    }
}


function onInitModules(context, type) {
    mod_hover.init(context, type);
    mod_compile.init(context, type);
}

function onActivate(context) {

    const active = vscode.window.activeTextEditor;
    activeEditor = active;

    registerDocType(settings.LANGUAGE_ID);

    function registerDocType(type) {
        context.subscriptions.push(
            vscode.languages.reg
        );

        // src: https://github.com/Microsoft/vscode/blob/master/extensions/python/src/pythonMain.ts
        // autoindent while typing
        vscode.languages.setLanguageConfiguration(type, {
            onEnterRules: [
                {
                    beforeText: /^\s*(?:struct|def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\s*$/,
                    action: { indentAction: vscode.IndentAction.Indent }
                }
            ]
        });

        /** module init */
        onInitModules(context, type);
        onDidChange();
        onDidSave(active.document);

        /** @event setup */
        /** @event onChange  */
        vscode.window.onDidChangeActiveTextEditor(editor => {
            activeEditor = editor;
            if (editor) {
                onDidChange();
            }
        }, null, context.subscriptions);

        /** @event onChange  */
        vscode.workspace.onDidChangeTextDocument(event => {
            if (activeEditor && event.document === activeEditor.document) {
                onDidChange(event);
            }
        }, null, context.subscriptions);

        /** @event onDidSaveTextDocument  */
        vscode.workspace.onDidSaveTextDocument(document => {
            onDidSave(document);
        }, null, context.subscriptions);


       /** @event onDidOpenTextDocument  */
        vscode.workspace.onDidOpenTextDocument(document => {
            onDidSave(document);
        }, null, context.subscriptions);


    }
}

/* exports */
exports.activate = onActivate;
