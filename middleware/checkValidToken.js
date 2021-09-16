const jwt = require("jsonwebtoken");
var nodesession = require('node-session');

/** Created middleware to check token is valid or not */

module.exports = (req,res,next) =>{
    try{

        let token = req.headers ? req.headers.token : undefined;

        if(token != undefined){
            /**Verifying jwt is token provided in headers */
            jwt.verify(token,'secret',(err,decoded)=>{
                if(decoded != null || decoded != undefined){
                    /**Configured user session*/
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