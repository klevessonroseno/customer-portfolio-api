import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Customer from '../app/models/Customer';

const models = [User, Customer];

class Database {
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();
