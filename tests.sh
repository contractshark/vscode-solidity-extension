#!/bin/sh
npx ajv test -s _workspace/tmLanguage.schema.json -d _workspace/slither.tmLangauge.json --valid
