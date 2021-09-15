const {Model} =require('objection');


const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'Xyz21sur@',
      database : 'test'
    }
  });

  Model.knex(knex);

  module.exports=Model;

