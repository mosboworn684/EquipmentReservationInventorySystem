const borrow = {}
const db = require('../models')

borrow.showBorrow = async (req, res) => {
    db.equipment.hasMany(db.borrow, { targetKey: 'equipment_id', foreignKey: 'id' });
    db.borrow.belongsTo(db.equipment, { targetKey: 'id', foreignKey: 'equipment_id' });

    db.user.hasMany(db.borrow, { targetKey: 'user_id', foreignKey: 'id' });
    db.borrow.belongsTo(db.user, { targetKey: 'id', foreignKey: 'user_id' });
    const showBorrow = await db.borrow.findAll({
        include: [{
            model: db.equipment,
        }, {
            model: db.user,
        },
        ],
        // order: [
        //     ['id', 'DESC'],
        // ]
    });
    return res.send(showBorrow)

}
borrow.addBorrow = async (req, res) => {
    var equipment_id = req.body.equipment_id
    var user_id = req.body.user_id
    var amount = req.body.amount
    var status = 1
    var borrow_date = new Date()
    var return_date = null
    const borrowEquipMent = await db.equipment.findOne({ where: { id: equipment_id } })
    if (borrowEquipMent.amount < amount) {
        const data = {
            status: "error",
            message: "สินค้าคงเหลือไม่เพียงพอ"
        }
        return res.send(data)
    } else {
        db.equipment.update({
            amount: borrowEquipMent.amount - amount,
        }, { where: { id: equipment_id } })
        db.borrow.create({
            equipment_id: equipment_id,
            user_id: user_id,
            amount: amount,
            status: status,
            borrow_date: borrow_date,
            return_date: return_date,
        }).then(function (resData) {
            if (resData) {
                const data = {
                    status: "success",
                    message: "เพิ่มข้อมูลสำเร็จ"
                }
                return res.send(data)
            }
        })
    }
}
borrow.returnBorrow = async (req, res) => {
    db.equipment.hasMany(db.borrow, { targetKey: 'equipment_id', foreignKey: 'id' });
    db.borrow.belongsTo(db.equipment, { targetKey: 'id', foreignKey: 'equipment_id' });
    const borrowFind = await db.borrow.findOne({
        where:{
            id: req.params.id
        },
        include: [{
            model: db.equipment,
        },
        ],
    });
    db.borrow.update({
        status: 2,
        return_date: new Date(),
    }, { where: { id: req.params.id } })
    db.equipment.update({
        amount: borrowFind.equipment.amount+borrowFind.amount,
    }, { where: { id: borrowFind.equipment_id } })
    .then(function (resData) {
        if (resData) {
            const data = {
                status: "success",
                message: "คืนสำเร็จ"
            }
            return res.send(data)
        }
    })
}
module.exports = borrow