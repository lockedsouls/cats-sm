const baseController = require("./baseController");

const COLUMNS = [
    {
        name: "username",
        isString: true
    },
    {
        name: "password",
        isString: true
    },
    {
        name: "followers",
        isString: false
    }
]

const userController = {
    getUserByColumn: (column, columnValue) => {
        return new Promise((resolve, reject) => {
            baseController.getDataByColumn("users", column, columnValue).then(data => resolve(data)).catch(error => reject(error));
        })
    },
    insertIntoUsers: (columnValues) => {
        return new Promise((resolve, reject) => {
            if (!columnValues.username) return reject("Username not provided");
            if (columnValues.username?.length < 4) return reject("Username must be at least 4 chars long");
            if (!columnValues.password) return reject("Password not provided");

            if (isNaN(columnValues?.followers)) columnValues.followers = 0;
    
            const data = [columnValues.username, columnValues.password, columnValues.followers]

            baseController.insertIntoColumn("users", COLUMNS, data).then(data => resolve(data)).catch(error => reject(error));
        })
    }
}

module.exports = userController;