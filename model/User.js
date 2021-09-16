const {Model} =require('objection');

/** Configured user model and extended objection model  */
class User extends Model{
    /**Configured user table for category model*/
    static get tableName(){
        return 'users'
    }
}

module.exports=User;