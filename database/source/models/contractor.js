/**
 * Created by Jan on 31.7.2016.
 */
const Contractor = (Conn, Sequelize) => {
    return( Conn.define('contractor', {
            type:{
                type: new Sequelize.VIRTUAL(Sequelize.STRING),
                get() {
                    return 'dodavatel';
                }
            },
            mark: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contractor: {
                type: Sequelize.STRING,
                allowNull: false
            }
        })
    )
};

export default Contractor;