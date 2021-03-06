const router = require('express').Router();
const joi = require("@hapi/joi");
const bcrypt = require('bcryptjs');
const User = require('./../models/user-model');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const DIR = './public/uploads';
let storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, DIR);    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });

 const upload = multer({ storage: storage });




router.post('/register', (req, res) => {

    const schema = joi.object({username: joi.string().required(), email: joi.string().required(), password: joi.string().required()});

        const {error, value} = schema.validate({username: req.body.username, email: req.body.email, password: req.body.password});
    if (error) {
        return res.status(400).json({success: false, message: error.details[0].message});
    }
    User.find({email: req.body.email}).then(users=>{
        if(users.length){
            return res.status(404).json({success: false, message: 'email is already used'});
        } else {
            const pass = bcrypt.hashSync(req.body.password, 10);
            req.body.password = pass;
            req.body['image'] = req.body.image? req.body.image: './uploads/avatar.png';
            const new_user = new User(req.body);
            new_user.save().then(saved_user=>{
                return res.status(200).json({success: true, user: {id: saved_user._id, username: saved_user.username, email: saved_user.email, image: saved_user.image,
                    token: saved_user.generate_jwt_token() } });
            }).catch(err=>{return res.status(500).json({success: false, message: err});});
        }
    }).catch(err=>{return res.status(500).json({success: false, message: err});});

});

router.post('/login', (req, res) => {

    const schema = joi.object({email: joi.string().required(), password: joi.string().required()});

        const {error, value} = schema.validate({ email: req.body.email, password: req.body.password});
    if (error) {
        return res.status(400).json({success: false, message: error.details[0].message});
    }
    User.findOne({email: req.body.email}).then(user=>{
       if(user) {
        const check_password = bcrypt.compareSync(req.body.password, user.password);
        if(check_password) { 
            return res.status(200).json({success: true, user: {id: user.id, username: user.username, email: user.email,
                image: user.image, token: user.generate_jwt_token()} });
        }
        else {
            return res.status(404).json({success: false, message: 'wrong email or password'});
        }
       } else {
        return res.status(404).json({success: false, message: 'wrong email or password'});
       }
    }).catch(err=>{return res.status(500).json({success: false, message: err});});

});


router.post('/add-image', upload.single('avatar') ,(req, res) => {
    if (req.file){ console.log(req.files);
        let image_path =`/uploads/${req.file.filename}`;
 
    return res.status(200).json({success: true, image: image_path});
    
} else { return res.status(500).json({success: false, message: 'can\'t add photo'});}
});

module.exports = router;
