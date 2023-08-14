let express = require('express')
var cors = require('cors')
const app = express()
const db = require('./models')

const PORT = process.env.PORT || 3002
const routerUser = require('./routes/userRoute')
const routerEquipMent = require('./routes/equipmentRoute')
const routerBorrow = require('./routes/borrowRoute')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', routerUser)
app.use('/', routerEquipMent)
app.use('/', routerBorrow)



db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('listening at PORT: ' + PORT)
    })
})
