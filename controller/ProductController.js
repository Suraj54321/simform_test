const Product = require('../model/Product');
const {Validator} = require('node-input-validator');

const index = async(req,res) =>{
    try{
        let queryParams={
            pageNumber:req.body.page_number ? req.body.page_number : 1,
            limit:req.body.limit ? req.body.limit : 10
        }
        let productData=await Product.query().page(queryParams);
        res.send({status:200,message:"Product listed successfully",data:productData})
    
    }catch(err){
        console.log(err);
    }
}

const create = async(req,res) =>{
    try{
        let requestData = req.body;
        const v = new Validator(requestData,
            {
                name:'required|maxLength:500',
                price:'required',
                category_id:'required'
            }
        )
    
        v.check().then((match) => {
            if(!match){
                res.send({status:500,message:v.errors,data:[]});
            }
        });

        let dataStored = await Product.query().insert(v.inputs);

        if(dataStored != undefined || dataStored != null){
            res.send({status:200,message:"Product created successfully",data:[]})
        }


    }catch(err){
        console.log(err);
    }
}

const update = async(req,res) =>{
    try{
        let product_id = req.params.product_id;
        let requestData = req.body;
        let rules={};

        if(requestData.name){
            rules = {...rules,name:'required|maxLength:500'}
        }
        if(requestData.price){
            rules = {...rules,price:'required'}
        }
        if(requestData.category_id){
            rules = {...rules,category_id:'required'}
        }

        const v = new Validator(requestData,rules)
    
        v.check().then((match) => {
            if(!match){
                res.send({status:500,message:v.errors,data:[]});
            }
        });

         await Product.query().where('id',product_id).update(v.inputs);
        res.send({status:200,message:"Category updated successfully",data:[]})
        


    }catch(err){
        console.log(err);
    }
}

const deleteProduct = async(req,res) =>{
    try{
        let product_id = req.params.product_id;
         await Product.query().deleteById(product_id);
        res.send({status:200,message:"Category deleted successfully",data:[]})
    }catch(err){
        console.log(err);
    }
}

module.exports={
    index,
    create,
    update,
    deleteProduct
}
