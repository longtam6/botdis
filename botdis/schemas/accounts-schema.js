const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}





const accountsSchema = mongoose.Schema({
  _id: reqString,
  username: reqString,
  reservedPlayerId: Number,
  permissions: [String],
  locale: reqString,
})

module.exports = mongoose.model('accounts', accountsSchema)