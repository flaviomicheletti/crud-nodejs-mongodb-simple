var assert   = require("assert");
var mongoose = require('mongoose');


//
// model schema
//
var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    dob: Date,
    address: String,
    phone: String,
    role: String
});

// model instance
new mongoose.model('User', schema);


//
// config
//
var configuring = function(mongoose, url) {
    // Make Mongoose use `findOneAndUpdate()`. 
    // Note that this option is `true` by default, you need to set it to false.
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    // Connection establishment
    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
}(mongoose, 'mongodb://localhost/crud01');

//configuring(mongoose, 'mongodb://localhost/crud01');

//
// service
//
var user = mongoose.model('User');

var service = {
    query: {
        username: "abc@example.com"
    },
    findUser: function (query, callback) {
        return user.findOne(query, callback);
    }
};


//
// read (controller)
//

service.findUser(service.query, function (error, response) {
    if (error) {
        console.log(error);
        return;
    }
    if (!response) {
        console.log('No Data Found');
        return;
    }    

    //console.log(response);
    assert.equal("abc@example.com", response.username);
    console.log("passou!");
    return;
});
