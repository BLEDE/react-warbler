const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.set('useCreateIndex', true);
// ES2017 asynch coding
mongoose.Promise = Promise;
// connect to a database we name warbler
mongoose.connect("mongodb://localhost/warbler", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useMongoClient: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");