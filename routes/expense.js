const express=require('express')
const router=express.Router()
const userauthentication=require('../middleware/auth')

const controller=require('../controllers/expense')

router.post('/postexpense',userauthentication.authenticate,controller.postExpense)
router.get('/getexpense',userauthentication.authenticate,controller.getExpense)
router.delete('/deleteexpense/:id',userauthentication.authenticate,controller.deleteExpense);
//router.get('/expense/:id',controller.getEditExpense);
//router.post('/user/:id',controller.postEditUser);


module.exports=router