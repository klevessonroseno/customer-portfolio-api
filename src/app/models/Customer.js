import Sequelize, { Model } from "sequelize";

class Customer extends Model {
    static init(connection){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            age:  Sequelize.INTEGER,
            purchases: Sequelize.ARRAY(Sequelize.RANGE(Sequelize.STRING)),
        }, {
            sequelize: connection,
        });
        
        return this;
    }
}

export default Customer;


