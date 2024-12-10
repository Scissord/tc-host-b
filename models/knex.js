import Knex from 'knex';
import KnexFile from '../knexfile.js';

import { attachPaginate } from 'knex-paginate';
attachPaginate();

export default (settings) => {
  if (!settings) {
    settings = KnexFile.development
  }
  return Knex(settings);
}
