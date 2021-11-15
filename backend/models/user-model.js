const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String},
   
});


UserSchema.methods.generate_jwt_token = function(){ 
    return jwt.sign({id: this._id}, '123456', {expiresIn:'7d'});
    }

const model =  mongoose.model('User', UserSchema);


module.exports = model;