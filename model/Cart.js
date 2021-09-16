const {Model} =require('objection');

/** Configured cart model and extended objection model   */
class Cart extends Model{
    /**Configured cart table for cart model*/
    static get tableName(){
        return 'carts'
    }
}

module.exports=Cart;