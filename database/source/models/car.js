/**
 * Created by Jan on 30.7.2016.
 */
const Car = (Conn, Sequelize) => {
    return( Conn.define('car', {
            type:{
                type: new Sequelize.VIRTUAL(Sequelize.STRING),
                get() {
                    return 'auto';
                }
            },
            mark: {
                type: Sequelize.STRING,
                allowNull: false
            },
            power: {
                type: Sequelize.STRING,
                allowNull: false
            }
        })
    )
};

export default Car;