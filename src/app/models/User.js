import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(connection){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
        }, {
            sequelize: connection,
        });
        return this;
    }
}

export default User;
