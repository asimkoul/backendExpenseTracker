const expense = require('../models/expense');

function isStringValid(string) {
    if(string==undefined || string.length==0){
        return true
    }else{
        return false
    }

}

exports.postExpense = async (req, res, next) => {

    const {expenseamount,description,category}=req.body
    if(isStringValid(expenseamount)||isStringValid(description)||isStringValid(category)){
        return res.status(500).json({success:false,message:'false params'})
    }
    try {
        const data=await expense.create({
            expenseamount:expenseamount,
            description:description,
            category:category,
            userId:req.user.id
        })
        res.status(201).json(data)
    } catch (error) {
        console.log("ERROR:(",error);
        res.status(500).json({ error: 'Failed to create expense' })
    }
};
exports.getExpense=async (req,res,next)=>{
    try {
        const expenses=await expense.findAll({where:{userId:req.user.id}})
        res.status(200).json(expenses);
    } catch (error) {
        console.log("ERROR:(",err);
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
}
exports.deleteExpense=async (req,res,next)=>{
    const expenseId=req.params.id
    expense.destroy({where:{id:expenseId,userId:req.user.id}})
    .then( ()=> {
        res.status(200).json({success:true,message:'deleted successfully'})
    }).catch(err => console.log(err));
}

exports.getEditExpense = (req, res, next) => {
    // const editMode = req.query.name;
    // if (!editMode) {
    //     return res.redirect('/');
    // }
    const id = req.params.id;
    expense.findByPk(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.log("ERROR:(", err);
            res.status(500).json({ error: 'Failed to enable edit mode' });
        });
};