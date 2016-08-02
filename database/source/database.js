/**
 * Created by Jan on 26.7.2016.
 */
import Sequelize from 'sequelize';
import Config from './dbConfig';
const Conn = new Sequelize(
    Config.database,
    Config.username,
    Config.password,
    Config.options
);

export default Conn;
