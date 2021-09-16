const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/dummydata", {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() => {console.log("connection successful...");})
.catch((error) => {console.log(error);})

module.exports = mongoose;