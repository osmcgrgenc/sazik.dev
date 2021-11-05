const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "User";
  }
  static get idColumn() {
    return "id";
  }
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }
}

module.exports = User;
// const mongoose = require('mongoose');

// let userSchema = mongoose.Schema({
//   Nickname: {
//     type: 'String'
//   },
//   Email: {
//     type: 'String'
//   },
//   Password: {
//     type: 'String'
//   },
//   Image: {
//     type: 'String'
//   }
// });

// module.exports = mongoose.model('User', userSchema, 'User');
