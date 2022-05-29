const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}





const itemsSchema = mongoose.Schema({
  /*_id: reqString,
  username: reqString,
  playerId: Number,
  permissions: [String],*/
  ownerId: Number,
  itemId: Number,
  count: Number,
  level: Number,
  exp: Number,
  totalExp: Number,
  promoteLevel: Number,
  locked: Boolean,
  refinement: Number,
  mainPropId: Number,
  appendPropIdList: [Number],
  equipCharacter:0,
})

module.exports = mongoose.model('items', itemsSchema)