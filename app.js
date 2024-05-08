const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const userRoutes=require('./routes/user')
const sequelize=require('./util/database')
const app=express()
const expenseRoutes=require('./routes/expense')
const User = require('./models/user')
const Expense = require('./models/expense')

app.use(bodyParser.json())
app.use(cors())
app.use('/user',userRoutes)
app.use('/expense',expenseRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)

sequelize.sync()
.then(result=>{
    app.listen(3000,()=>{
        console.log('server started')
    })
})
.catch(err=> console.log(err))