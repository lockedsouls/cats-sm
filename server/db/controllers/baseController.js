const db = require("../db");

const baseController = {
    getDataByColumn: (table, column, columnValue, isString=true) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${table} WHERE ${column}=${isString ? "'" : null}${columnValue}${isString ? "'": null}`, (error, data) => {
                if (error) return reject(error);
                resolve(data);
            });
        })
    },

    insertIntoColumn: (table, columns, values) => {
        return new Promise((resolve, reject) => {
            const queryColumns = columns.map(item => item.name).toString();
            const queryDataLine = values.map((item, index) => {
                if (columns[index].isString) return `'${item}'`;
                return item; 
            });
            
            const query = `INSERT INTO ${table}(${queryColumns}) VALUES(${queryDataLine})`;
            console.log(query);

            db.query(query, (error, data) => {
                if (error) return reject(error);
                resolve(data);
            })
        })
    }
}

module.exports = baseController;