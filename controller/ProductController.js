const Product = require('../model/Product');
const {Validator} = require('node-input-validator');
const path = require('path');
const uploadLocalPath=path.join(__dirname,'../') +'public/product/';
const helper = require('../helpers/helper');

/** @Product listing method */
const index = async(req,res) =>{
    try{
        
        let queryParams={
            pageNumber:req.body.page_number ? req.body.page_number : 1,
            limit:req.body.limit ? req.body.limit : 10
        }
        let productData=await Product.query().withGraphFetched('[category]').page(queryParams);
        res.send({status:200,message:"Product listed successfully",data:productData})
    
    }catch(err){
        console.log(err);
    }
}

/** @Product create method */
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
       
        let response =helper.uploadImageLocal(req,res,uploadLocalPath,dataStored.id)
        if(response != 'undefine')
        {
            await Product.query().where({id:dataStored.id}).update({image:response})
        }

        if(dataStored != undefined || dataStored != null){
            res.send({status:200,message:"Product created successfully",data:[]})
        }


    }catch(err){
        console.log(err);
    }
}

/** @Product update based on product_id */
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

        let imageNameForUnlink =await Product.query().where('id',product_id).first();
         let response =helper.uploadImageLocal(req,res,uploadLocalPath,product_id,'update',imageNameForUnlink.image ? imageNameForUnlink.image : 0)
         let dataToUpdate={
            name:requestData.name,
            image:response
         }
         await Product.query().where('id',product_id).update(dataToUpdate);
        res.send({status:200,message:"Category updated successfully",data:[]})
        


    }catch(err){
        console.log(err);
    }
}

/** @Product delete based on product_id */
const deleteProduct = async(req,res) =>{
    try{
        let product_id = req.params.product_id;
         await Product.query().deleteById(product_id);
        res.send({status:200,message:"Category deleted successfully",data:[]})
    }catch(err){
        console.log(err);
    }
}

/** Exported all the method of product controller */
module.exports={
    index,
    create,
    update,
    deleteProduct
}
