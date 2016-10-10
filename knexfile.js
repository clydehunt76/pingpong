// Update with your config settings.
console.log('NODE_ENV=', process.env.NODE_ENV);
const vcap = process.env.VCAP_SERVICES && JSON.parse(process.env.VCAP_SERVICES);
const mysql = vcap ? vcap['p-mysql'][0].credentials : {};

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'pingPong_development'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: mysql.hostname,
      user: mysql.username,
      password: mysql.password,
      database: mysql.name
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'L1mavady',
      database: 'pingPong_test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
