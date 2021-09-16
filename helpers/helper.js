
var fs = require('fs');

const uploadImageLocal =(req,res,local_path,id,type,imageNameUnlink) =>{
    
    
    if (req.files || Object.keys(req.files).length != 0) {
            let fileName = req.files.image.name;
            let pathCheck = local_path + `${id}`;
            if(type == 'update' && imageNameUnlink != 0){
                fs.unlink(imageNameUnlink,()=>{})
            }
            
            if (!fs.existsSync(pathCheck)){
                fs.mkdir(pathCheck,(err)=>{
                    if (err) {
                        console.log(err)
                      }
                })
            }
            let uploadLocalPath = local_path+`${id}`+"/"+fileName
            req.files.image.mv(uploadLocalPath,(err) => {
                if(err){
                    return res.status(500).send(err);
                }
              });

              return uploadLocalPath;
    }
    else{
        return 0;
    }
}

module.exports = {
    uploadImageLocal
}