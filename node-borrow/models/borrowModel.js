module.exports =(sequelize,DataTypes)=>{
    var borrow = sequelize.define('borrow',{
        id: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        equipment_id : DataTypes.INTEGER,
        user_id : DataTypes.INTEGER,
        status : DataTypes.INTEGER,
        amount : DataTypes.INTEGER,
        borrow_date : DataTypes.DATEONLY,
        return_date : DataTypes.DATEONLY,
    },{
        freezeTableName : true,
        timestamps : true,
    })
    return borrow
} 