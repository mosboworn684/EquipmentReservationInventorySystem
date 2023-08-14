const equipment = {}
const db = require('../models')

equipment.showEquipMent = async(req, res) => {
    const showEquipMent = await db.equipment.findAll()
    return  res.send(showEquipMent)
}
equipment.getEquipMent = async(req, res) => {
    const getEquipMent = await db.equipment.findOne({where:{id:req.params.id}})
    return  res.send(getEquipMent)
}
equipment.addEquipMent = async (req, res) => {
    var name = req.body.name
    var amount = req.body.amount
    if (name == "" || amount == ""){
        const data = {
            status: "error",
            message: "เพิ่มข้อมูลไม่สำเร็จ"
        }
        return res.send(data)
    }
    db.equipment.create({
        name: name,
        amount: amount,
        // unitlimit: unitlimit
    }).then(function (resData){
        if(resData){
            const data = {
                status: "success",
                message: "เพิ่มข้อมูลสำเร็จ"
            }
            return res.send(data)
        }
    })
}
equipment.editEquipMent = async (req, res) => {
    var name = req.body.name
    var amount = req.body.amount

    db.equipment.update({
        name: name,
        amount: amount,
    },
        { where: { id: req.params.id } }
    ).then(function (resData) {
        if (resData) {
            const data = {
                status: "success",
                message: "แก้ไขข้อมูล"
            }
            return res.send(data)
        }
    })

}
module.exports = equipment