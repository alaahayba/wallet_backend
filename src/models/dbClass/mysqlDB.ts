const mysql = require('mysql2/promise');

interface dataObject {
    amount?: any;
    destination?: string;
    source?: string;
    mobile?: string;
    type?: any

}

export default class mysqlDB {
    name: string;
    config: object;
    private pool: any;

    constructor(aName: string, aConfig: object) {
        this.name = aName;
        this.config = aConfig;
        this.pool = mysql.createPool(aConfig);
    }

    async getConnection() {
        return await this.pool.getConnection();
    }


    async runStatement(statement: string, data: any[]) {
        var conn = await this.getConnection();
        let executingResult = await conn.query(statement, data)
        conn.release();
        return executingResult;
    };

    async update(tableName: string, whereClause: dataObject,
        updateClause: dataObject) {
        let dataValues: string[] = [];
        let statement = `update ${tableName}  SET `;
        for (let key in updateClause)
            statement += `${key}=?,`;
        statement = statement.slice(0, -1);

        statement += ` WHERE `;
        for (let key in whereClause)
            statement += `${key}=? and`
        statement = statement.slice(0, -3);

        dataValues = [...Object.values(updateClause), ...Object.values(whereClause)]

        console.log(">>>dataValues", statement, dataValues)
        let result = await this.runStatement(statement, dataValues);
        return result;
    }

    async updateBalance(tableName: string, whereClause: dataObject, updateClause: any) {
        let dataValues: string[] = [];
        let statement = `update ${tableName}  
        SET balance = balance + ${updateClause.amount} WHERE `;

        for (let key in whereClause)
            statement += ` ${key}=? and`
        statement = statement.slice(0, -3);

        dataValues = [...Object.values(whereClause)]

        console.log(">>>dataValues", statement, dataValues)
        let result = await this.runStatement(statement, dataValues);
        return result;
    }

    async deductfromBalance(tableName: string, whereClause: dataObject, updateClause: any) {
        let dataValues: string[] = [];
        let statement = `update ${tableName}  
        SET balance = balance - ${updateClause.amount} WHERE `;

        for (let key in whereClause)
            statement += `${key}=? and`
        statement += ` balance>=${updateClause.amount} `;

        dataValues = [...Object.values(whereClause)]

        let result = await this.runStatement(statement, dataValues);

        return result[0].affectedRows;
    }

    async insertByObject(tableName: string, dataObject: any) {
        let quesMark: string[] = [];
        let dataValues = Object.values(dataObject);

        quesMark = Array(dataValues.length).fill("?")

        let statement = `Insert Into ${tableName} 
        (${Object.keys(dataObject).join(',')}) 
        VALUES (${Object.values(quesMark).join(",")});`;

        let result = await this.runStatement(statement, dataValues);
        return result;
    }


    async filter(tableName: string, dataObject: { [x: string]: any; limit?: any; }, selectedColumns: string[],
        operatorsFilter: string[]) {

        let keys = Object.keys(dataObject);
        var statement = `select ${Array.isArray(selectedColumns) && selectedColumns.length ?
            selectedColumns.join(',') : "*"} from ${tableName}  `;
        keys.length && (statement += 'where ');
        let limit = dataObject.limit || null;
        delete dataObject.limit;
        let data = [];
        let operator = "=";
        for (let i = 0; i < keys.length; i++) {
            // if (operatorsFilter) operator = operatorsFilter[keys[i]] || " = ";
            statement += `${keys[i]} ${operator}`;
            let objdata = dataObject[keys[i]];
            statement += (operator != "in") ? "?" :
                '(' + Array(objdata.length).fill("?").join(',') + ')';

            objdata = Array.isArray(objdata) ? objdata : [objdata];
            data.push(...objdata)

            statement += `${(i < keys.length - 1) ? ' and ' : ''}`;
        }
        if (limit) statement += ` order by created_at desc limit ${limit} `;

        console.log("statement", statement, data)
        let result = await this.runStatement(statement, data);
        return result[0]
    }


    stop() {
        this.pool.end();
    }

}