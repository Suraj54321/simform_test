const User = require('../model/User');
const {Validator} = require('node-input-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req,res) =>{
    try{
        let requestData = req.body;
    const v = new Validator(requestData,
        {
            firstname:'required|minLength:100',
            lastname:'required|minLength:100',
            email:'required|email',
            password:'required'
        }
    )

    v.check().then((match) => {
        if(!match){
            res.send({status:500,message:v.errors,data:[]});
        }
    });

    

    let emailChecked = await User.query().where('email',requestData.email);
    if(Object.keys(emailChecked).length == 0){
        let newPassword = await bcrypt.hash(requestData.password,10);
        let dataToStore = {
            firstname:requestData.firstname,
            lastname:requestData.lastname,
            email:requestData.email,
            password:newPassword,
            role:requestData.role
        }
        let dataForToken=await User.query().insert(dataToStore);
        let token =jwt.sign({user_id:dataForToken.id,email:dataForToken.email,role:dataForToken.role},'secret',{expiresIn:"2h"})
        
        dataForToken = {...dataForToken,token}

        res.send({status:200,message:"User registered successfullu",data:dataForToken})
    }
        

    }catch(err){
        console.log(err);
    }
}


const login = async(req,res) =>{
    try{

        const v = new Validator(
            {
                email:'required|email',
                password:'required'
            }
        )
    
        v.check().then((match) => {
            if(!match){
                res.send({status:500,message:v.errors,data:[]});
            }
        });
    
        let requestData = req.body;

        let emailChecked = await User.query().where('email',requestData.email).first();
        let checkPassword =await bcrypt.compare(requestData.password,emailChecked.password);
        if(checkPassword == true){
            let token =jwt.sign({user_id:emailChecked.id,email:emailChecked.email,role:emailChecked.role},'secret',{expiresIn:"2h"})
            emailChecked = {...emailChecked,token}
            res.send({status:200,message:"Login successfull",data:emailChecked});
        }

    }catch(err){
        console.log(err);
    }
}

module.exports={
    login,
    register
}