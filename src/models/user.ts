import mysqlDB from './dbClass/mysqlDB'
let { userConn } = require('../configs/dbConfig')
interface filterInterface {
    mobile?: string;
    name?: string;
    balance?: number;
}

interface userInterface {
    mobile: string;
    name: string;
    password: string;
    balance: number;
}

let user = class {
    tableName: string;
    dbObj: mysqlDB;

    constructor(configs: { tableName: string }) {
        this.tableName = configs.tableName
        this.dbObj = new mysqlDB(userConn.name, userConn.config)
    }

    async find(datatofilter: filterInterface, column: string[]) {
        let userData = await this.dbObj.filter(this.tableName, datatofilter,
            column, ['='])
        return userData
    }
    async save(userData: userInterface) {
        let userInfo = await this.dbObj.insertByObject(this.tableName, userData)
        return userInfo
    }
}
let userModel = new user({ tableName: "user" })
export { userModel }