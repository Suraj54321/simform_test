const jwt = require("jsonwebtoken");
var nodesession = require('node-session');

module.exports = (req,res,next) =>{
    try{

        let token = req.headers ? req.headers.token : undefined;

        if(token != undefined){
            jwt.verify(token,'secret',(err,decoded)=>{
                if(decoded != null || decoded != undefined){
                    let session=new nodesession({secret:'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'})
                    session.startSession(req, res,() => {})
                    req.session.put(decoded)
                    next();
                }
            })
        }
        else{
            res.send({status:500,message:"Unauthorized access",data:[]})
        }


    }catch(err){
        console.log(err);
    }    
}