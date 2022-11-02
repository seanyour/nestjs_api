import { load } from "js-yaml";
import { readFileSync } from "fs";
import { join } from 'path';

const fileName = `${process.env.NODE_ENV}.yml`;

export default () => {
  return load(
    readFileSync(join(__dirname, fileName), 'utf8')
  );
}
