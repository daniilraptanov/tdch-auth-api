import { Sequelize } from "sequelize";
require('dotenv-safe').config();


export class DBConnector {
    private static _db: Sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          dialect: "postgres",
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT)
        }
    ); 

    private constructor() {}

    static async connect(): Promise<void> {
        try {
            await this._db.authenticate();
            console.log(`Success connect to database => ${this._db.config.database}`);
        } catch (err) {
            console.log(`Failed connect to database => ${err}`);
        }
    };
}
