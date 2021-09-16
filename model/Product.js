const {Model} =require('objection');
const Category = require('./Category');

/** Configured product model and extended objection model  */
class Product extends Model{
    /**Configured product table for category model*/
    static get tableName(){
        return 'products'
    }

    static relationMappings = {
        category: {
          relation: Model.BelongsToOneRelation,
          modelClass: Category,
          join: {
            from: 'products.category_id',
            to: 'category.id'
          }
        }
      };
}

module.exports=Product;