const { Model } = require("objection");

class UserCode extends Model {
  static get tableName() {
    return "UserCode";
  }
  static get idColumn() {
    return "id";
  }
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }
}
module.exports = UserCode;
// const mongoose = require('mongoose');

// let userCode = mongoose.Schema({
//   UserId: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   CodeId: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Code',
//     required: true
//   }
// });

// module.exports = mongoose.model('UserCode', userCode, 'UserCode');
