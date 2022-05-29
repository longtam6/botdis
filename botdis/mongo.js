const mongoose = require('mongoose');
//const mongoPath = 'mongodb://localhost:27017'

const mongoPath = 'mongodb://localhost:27017/grasscutter?retryWrites=true&w=majority'

//mongodb://ps:ps@localhost:27017/?authMechanism=DEFAULT&authSource=grasscutter
module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })

  return mongoose
}