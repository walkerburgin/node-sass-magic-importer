import * as fs from 'fs';
import * as sass from 'node-sass';

import { exec } from 'child_process';

import * as onceImporter from '../packages/node-sass-once-importer/dist/index';

describe(`onceImporter()`, () => {
  test(`It should import files only once.`, () => {
    const expectedResult = fs.readFileSync(`test/files/once-import.css`, {
      encoding: `utf8`,
    });

    const result = sass.renderSync({
      file: `test/files/once-import.scss`,
      importer: onceImporter(),
    }).css.toString();

    expect(result).toBe(expectedResult);
  });

  test(`It should import files only once via CLI.`, async () => {
    // tslint:disable-next-line max-line-length
    const cmd = `node node_modules/.bin/node-sass --importer packages/node-sass-once-importer/dist/cli.js test/files/once-import.scss`;
    const expectedResult = fs.readFileSync(`test/files/once-import.css`, {
      encoding: `utf8`,
    });

    const result = await new Promise((resolve) => {
      exec(cmd, (error, stdout) => {
        if (error) {
          throw error;
        }
        resolve(stdout);
      });
    });

    expect(result).toBe(expectedResult);
  });
});
