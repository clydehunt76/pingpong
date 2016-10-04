'use strict';

const knexFile = require('../knexfile');
const envName = process.env.NODE_ENV || 'development';
const config = knexFile[envName];
console.log('config=', config);

const knex = require('knex')(config);
//knex.migrate.latest();

const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
