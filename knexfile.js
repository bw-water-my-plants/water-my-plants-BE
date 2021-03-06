require('dotenv').config();

const localConnection = {
    host: 'localhost',
    database: 'my_db',
    user: 'username',
    password: 'password'
};

const dbConnection = process.env.DATABASE_URL || localConnection;

module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './src/database/water-my-plants.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        }
    },
    testing: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './src/database/test.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        }
    },
    production: {
        client: 'pg',
        connection: dbConnection,
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        }
    }
};
