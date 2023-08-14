const user = {}
const db = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10
var jwt = require('jsonwebtoken');
const secrect = "borrow"
user.login = async (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if (username == null || password == null) {
        const data = {
            "status": 0,
            "message": "กรุณาตรวจสอบ username และ password",
        }
        return res.send(data)
    }
    // bcrypt.compare(password, checkuser.password, function(err, result) {
    //     console.log(result)
    // });
    // const checkuser = await db.user.findOne({ where: { username: username, password: password } })
    // // console.log(checkuser.password)
    // console.log(checkuser)
    // if (checkuser) {
    //     return res.send(checkuser)
    // }
    // else {
    //     const data = {
    //         "status": 0,
    //         "message": "กรุณาตรวจสอบ username และ password",
    //     }
    //     return res.send(data)
    // }
    try {
        const checkuser = await db.user.findOne({ where: { username: username } });
        if (!checkuser) {
            // ไม่พบผู้ใช้ในระบบ
            return res.json({ message: 'กรุณาตรวจสอบ username และ password','status': 'error',});
        }
        bcrypt.compare(password, checkuser.password, async (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (result) {
                // รหัสผ่านถูกต้อง 
                var token = jwt.sign({ username: checkuser.username }, secrect, { expiresIn: '1h' });
                return res.json({
                    'message': 'Login สำเร็จ',
                    'status': 'success',
                    'token': token,
                    'user_id': checkuser.id,
                    'user': checkuser
                });
            } else {
                // รหัสผ่านไม่ตรงกัน
                return res.json({ message: 'กรุณาตรวจสอบ username และ password', 'status': 'error'});
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
user.authen = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secrect);
        return res.json({ token: decoded, "status": "success" })
    } catch (err) {
        return res.json({ message: err.message , "status": "error1" })
    }
}
user.showUser = async (req, res) => {
    const showuser = await db.user.findAll()
    return res.send(showuser)
}
user.getUser = async (req, res) => {
    const getUser = await db.user.findOne({ where: { id: req.params.id } })
    return res.send(getUser)
}
user.addUser = async (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var first_name = req.body.first_name
    var last_name = req.body.last_name

    if (username == "" || password == "" || first_name == "" || last_name == "") {
        const data = {
            status: "error",
            message: "เพิ่มข้อมูลไม่สำเร็จ"
        }
        return res.send(data)
    }
    bcrypt.hash(password, saltRounds, function (err, hash) {
        db.user.create({
            username: username,
            password: hash,
            first_name: first_name,
            last_name: last_name
        }).then(function (resData) {
            if (resData) {
                const data = {
                    status: "success",
                    message: "เพิ่มข้อมูลสำเร็จ"
                }
                return res.send(data)
            }
        })
    });
}

user.editUser = async (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var first_name = req.body.first_name
    var last_name = req.body.last_name

    db.user.update({
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name
    },
        { where: { id: req.params.id } }
    ).then(function (resData) {
        if (resData) {
            const data = {
                status: 1,
                message: "แก้ไขข้อมูล"
            }
            return res.send(data)
        }
    })

}

user.deleteUser = async (req, res) => {
    db.user.destroy(
        { where: { id: req.params.id } }
    ).then(function (resData) {
        if (resData) {
            const data = {
                status: 1,
                message: "ลบข้อมูลสำเร็จ"
            }
            return res.send(data)
        }
    })

}
module.exports = user