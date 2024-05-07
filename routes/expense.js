const express=require('express')
const router=express.Router()

const controller=require('../controllers/expense')

router.post('/postexpense',controller.postExpense)
router.get('/getexpense',controller.getExpense)
router.delete('/deleteexpense/:id',controller.deleteExpense);
//router.get('/expense/:id',controller.getEditExpense);
//router.post('/user/:id',controller.postEditUser);


module.exports=router