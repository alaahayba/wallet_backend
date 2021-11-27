module.exports = {
    userConn: {
        name: 'user',
        config: {
            connectionLimit: 5,
            host: process.env.MYSQL_HOST,
            database: 'wallet',
            user: 'root',
            password: process.env.MYSQL_PASS,
            port: process.env.MYSQL_PORT ,
            multipleStatements: true
        }
    },
    transactions: {
        name: 'transactions',
        config: {
            connectionLimit: 5,
            host: process.env.MYSQL_HOST,
            database: 'wallet',
            user: 'root',
            password: process.env.MYSQL_PASS,
            port: process.env.MYSQL_PORT ,
            multipleStatements: true,
            supportBigNumbers: true,
            timezone: 'Z',

        }
    }

}
