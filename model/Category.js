const {Model} =require('objection');

/** Configured category model and extended objection model  */
class Category extends Model{
    /**Configured category table for category model*/
    static get tableName(){
        return 'category'
    }
}

module.exports=Category;