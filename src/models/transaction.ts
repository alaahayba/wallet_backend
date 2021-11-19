import mysqlDB from './dbClass/mysqlDB'
let { transactions, userConn } = require('../configs/dbConfig')
interface transfer {
    source: string;
    destination: string;
    amount: number;
}

interface deposit {
    destination: string;
    amount: number;
}
interface transactionFilter {
    source?: string;
    destination?: string;
    amount?: number
}
enum trnasactionType {
    deposit = 1,
    transfer = 2
}
let trnasaction = class {
    tableName: string;
    dbObj: mysqlDB;
    //  userdbObj: mysqlDB;

    constructor(configs: { tableName: string }) {
        this.tableName = configs.tableName
        this.dbObj = new mysqlDB(transactions.name, transactions.config);
        //  this.userdbObj = new mysqlDB(userConn.name, userConn.config)

    }
    async updatBalance(mobile: any, amount: any) {
        //TODO use fun from user model
        let balanceUpdate = amount > 0 ?
            await this.dbObj.updateBalance("user", { mobile }, { amount }) :
            await this.dbObj.deductfromBalance("user", { mobile }, { amount: amount * -1 })

        return balanceUpdate;
    }

    async deposit(depositData: deposit) {
        let { destination, amount } = depositData;
        //TODO make it transaction
        //update balances
        let balanceUpdate = await this.updatBalance(destination, amount)

        //then insert into transaction table table
        let depositeResult = await this.dbObj.insertByObject(this.tableName, { destination, amount, type: trnasactionType.deposit });
        return { balanceUpdate, depositeResult };
    }

    async transfer(transferData: transfer) {
        let { source, destination, amount } = transferData;
        console.log("source, destination, amount",source, destination, amount)
        //TODO : update balances shou;d be enhanced for n times connection 
        let sourceUpdate = await this.updatBalance(source, amount * -1)
        if (!sourceUpdate) throw new Error("balance is not enough ")
        let destUpdate = await this.updatBalance(destination, amount)
        //TODO : then insert into transaction table table
        let transferInfo = this.dbObj.insertByObject(this.tableName,
            { source, destination, amount, type: trnasactionType.transfer });

        return { transferInfo, sourceUpdate };
    }

    async filter(filterData: transactionFilter) {
        let filterInfo = this.dbObj.filter(this.tableName, filterData, [], ['=']);
        return filterInfo;
    }

}

let transactionModel = new trnasaction({ tableName: "transaction" })
export { transactionModel }