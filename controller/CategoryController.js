const Category = require('../model/Category');
const {Validator} = require('node-input-validator');
const path = require('path');
const uploadLocalPath=path.join(__dirname,'../') +'public/category/';
const helper = require('../helpers/helper');

/** @Cateory listing method */
const index = async(req,res) =>{
    try{
        let queryParams={
            pageNumber:req.body.page_number ? req.body.page_number : 1,
            limit:req.body.limit ? req.body.limit : 10
        }
        let categoryData=await Category.query().page(queryParams);
        res.send({status:200,message:"Category listed successfully",data:categoryData})
    
    }catch(err){
        console.log(err);
    }
}

/** @Category create method */
const create = async(req,res) =>{
    try{
        let requestData = req.body;
        const v = new Validator(requestData,
            {
                category_name:'required|maxLength:500',
            }
        )
    
        v.check().then((match) => {
            if(!match){
                res.send({status:500,message:v.errors,data:[]});
            }
        });

        let checkCategoryExistsOrNot = await  Category.query().where('category_name','=',requestData.category_name).first();
            console.log(checkCategoryExistsOrNot);
            
        if(checkCategoryExistsOrNot == undefined){
            let dataStored = await Category.query().insert(v.inputs);
            
            
                let response =helper.uploadImageLocal(req,res,uploadLocalPath,dataStored.id)

                if(response != 'undefine')
                {
                    await Category.query().where({id:dataStored.id}).update({image:response})
                }

            if(dataStored != undefined || dataStored != null){
                res.send({status:200,message:"Category created successfully",data:[]})
            }
        }
        else{
            res.send({status:500,message:"Category already exists",data:[]})
        }


    }catch(err){
        console.log(err);
    }
}

/** @Category update based on category_id */
const update = async(req,res) =>{
    try{
        let category_id = req.params.category_id;
        let requestData = req.body;
        let rules ={};

        if(req.body.category_name){
            rules={...rules,category_name:'required|maxLength:500'}
        }
        const v = new Validator(requestData,rules);
    
        v.check().then((match) => {
            if(!match){
                res.send({status:500,message:v.errors,data:[]});
            }
        });

         
         let imageNameForUnlink =await Category.query().where('id',category_id).first();
         let response =helper.uploadImageLocal(req,res,uploadLocalPath,category_id,'update',imageNameForUnlink.image)

         let dataToUpdate={
            category_name:requestData.category_name,
            image:response
         }
         await Category.query().where('id',category_id).update(dataToUpdate);
        res.send({status:200,message:"Category updated successfully",data:[]})

    }catch(err){
        console.log(err);
    }
}

/** @Category delete based on category_id */
const deleteCategory = async(req,res) =>{
    try{
        let category_id = req.params.category_id;
         await Category.query().deleteById(category_id);
        res.send({status:200,message:"Category deleted successfully",data:[]})
        


    }catch(err){
        console.log(err);
    }
}

/** Exported all the method of category controller */
module.exports={
    index,
    create,
    update,
    deleteCategory
}
