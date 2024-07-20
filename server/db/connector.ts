/**
 * External Dependencies
 */
const { Pool } = require('pg')

/**
 * Internal Dependencies
 */
const config = require("../config.json")

class DBConnector {

    static instance;
    dbInstance;

    constructor() {

    }

    static getInstance() {
        if(!DBConnector.instance) {
            DBConnector.instance = new DBConnector()
        }
        return DBConnector.instance;
    }

    initDB() {
        const pool = new Pool({
            ...config.db
        })

        this.dbInstance = pool;
    }

}

module.exports = DBConnector;
