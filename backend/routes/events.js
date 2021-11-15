const router = require('express').Router();
const joi = require("@hapi/joi");
const bcrypt = require('bcryptjs');
const Event = require('./../models/event-model');
const User = require('./../models/user-model');
const jwt = require('../middlewares/auth-middleware');
const moment = require('moment');
router.post('/add-event', jwt, (req, res) => {

    User.findById(req.user_id).then(user => {
        if(user){
            const schema = joi.object({name: joi.string().required(), location: joi.string().required(), 
                startDate: joi.date().max(new Date(req.body.endDate)).required(), endDate: joi.date().required()});
        
            const {error, value} = schema.validate({name: req.body.name, location: req.body.location, 
                    startDate: req.body.startDate, endDate: req.body.endDate});
                    
            if (error){
                return res.status(400).json({success: false, message: error.details[0].message});
            }
            else {
                const event = new Event({...req.body, submittedAt: new Date(), closed: false, user});
                event.save().then(saved_event=>{
                    return res.status(201).json({success: true, event: saved_event});
                }).catch(err=>{console.log(err); return res.status(500).json({success: false, message: err});});
            }
        }
        else {
            console.log(err); return res.status(500).json({success: false, message: 'user doesn\'t exist'});
        } 
    }).catch(err=>{console.log(err); return res.status(500).json({success: false, message: err});});
});

router.get('/get-events', (req, res) => {

                Event.find({}).then(events => {
                    if(events.length){
                        return res.status(200).json({success: true, events});
                    }
                    else {
                        return res.status(404).json({success: false, message: 'no events added yet'});
                    }
                })
                .catch(err=>{console.log(err); return res.status(500).json({success: false, message: err});});
            
               
            
        
   
});

module.exports = router;