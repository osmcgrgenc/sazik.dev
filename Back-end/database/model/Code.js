const { Model } = require("objection");

class Code extends Model {
  static get tableName() {
    return "Code";
  }
  static get idColumn() {
    return "id";
  }
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }
}

module.exports = Code;
// const mongoose = require('mongoose');

// let codeSchema = mongoose.Schema({
//   CodeName: {
//     type: 'String'
//   },
//   CodeLanguage: {
//     type: 'String'
//   },
//   IsActive: {
//     type: 'Boolean'
//   },
//   UserId: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//     required: true
//   }
// });

// module.exports = mongoose.model('Code', codeSchema, 'Code');
