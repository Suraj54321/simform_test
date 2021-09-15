const Cart = require('../model/Cart');
const {Validator} = require('node-input-validator');

const index = async(req,res) =>{
    try{
        
            let pageNumber=req.body.page_number ? parseInt(req.body.page_number) : 1;
            let limit =req.body.limit ? parseInt(req.body.limit) : 10
            let cartData=await Cart.query().page({pageNumber,limit});
            
            res.send({status:200,message:"Cart listed successfully",data:cartData})
    
    }catch(err){
        console.log(err);
    }
}

const create = async(req,res) =>{
    try{
        let requestData = req.body;
        const v = new Validator(requestData,
            {
                product_id:'required|maxLength:500',
            }
        )
    
        v.check().then((match) => {
            if(!match){
                res.send({status:500,message:v.errors,data:[]});
            }
        });

        let cartExistsOrNot = await  Cart.query().where('product_id',requestData.product_id).first();

            
        if(cartExistsOrNot == undefined){
            let dataToStore={
                product_id:requestData.product_id,
                user_id:req.session.__attributes.user_id,
                quantity:1 
            }
            let dataStored = await Cart.query().insert(dataToStore);

            if(dataStored != undefined || dataStored != null){
                res.send({status:200,message:"Cart created successfully",data:[]})
            }
        }
        else{
            res.send({status:500,message:"Cart already exists",data:[]})
        }


    }catch(err){
        console.log(err);
    }
}

const updateCartQuantity = async(req,res) =>{
    try{
        let cart_id =req.params.cart_id;
        let requestData = req.body;
        const v = new Validator(requestData,
            {
                quantity:'required|maxLength:500',
            }
        )
    
        v.check().then((match) => {
            if(!match){
                res.send({status:500,message:v.errors,data:[]});
            }
        });

        await  Cart.query().where('id',cart_id).update({quantity:requestData.quantity});
        res.send({status:200,message:"Cart updated successfully",data:[]})

    }catch(err){
        console.log(err);
    }
}


const deleteCart = async(req,res) =>{
    try{
        let cart_id = req.params.cart_id;
         await Cart.query().deleteById(cart_id);
        res.send({status:200,message:"Cart deleted successfully",data:[]})  
    }catch(err){
        console.log(err);
    }
}

module.exports={
    index,
    create,
    updateCartQuantity,
    deleteCart
}
