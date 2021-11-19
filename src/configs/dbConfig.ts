module.exports = {
    userConn: {
        name: 'user',
        config: {
            connectionLimit: 5,
            host: 'localhost',
            database: 'wallet',
            user: 'root',
            password: '1234',
            port: 3306,
            multipleStatements: true
        }
    },
    transactions: {
        name: 'transactions',
        config: {
            connectionLimit: 5,
            host: 'localhost',
            database: 'wallet',
            user: 'root',
            password: '1234',
            port: 3306,
            multipleStatements: true,
            supportBigNumbers: true,
            timezone: 'Z',

        }
    }

}
