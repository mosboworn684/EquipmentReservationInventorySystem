module.exports =(sequelize,DataTypes)=>{
    var equipment = sequelize.define('equipment',{
        id: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : DataTypes.STRING,
        amount : DataTypes.INTEGER,
    },{
        freezeTableName : true,
        timestamps : true,
    })
    return equipment
} 