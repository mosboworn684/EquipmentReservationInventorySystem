module.exports =(sequelize,DataTypes)=>{
    var user = sequelize.define('user',{
        id: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : DataTypes.STRING,
        password : DataTypes.STRING,
        first_name : DataTypes.STRING,
        last_name : DataTypes.STRING,
    },{
        freezeTableName : true,
        timestamps : true,
    })
    return user
}