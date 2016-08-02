/**
 * Created by Jan on 31.7.2016.
 */
const Bike = (Conn, Sequelize) => {
    return( Conn.define('bike', {
            type:{
                type: new Sequelize.VIRTUAL(Sequelize.STRING),
                get() {
                    return 'motorka';
                }
            },
            brand: {
                type: Sequelize.STRING,
                allowNull: false
            },
            objem: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            maxSpeed: {
                type: Sequelize.STRING,
                allowNull: false
            }
        })
    )
};

export default Bike;