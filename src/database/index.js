import { Sequelize } from "sequelize/types";
import databaseConfig from '../config/database';
import User from '../models/User';

const models = [User];

class Database {
    constructor(){

    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();
