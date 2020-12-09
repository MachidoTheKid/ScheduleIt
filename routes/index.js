const express= require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require("../middleware/auth")

const Assignment = require('../models/Assignment');
const Milestone = require('../models/Milestone');

router.get('/', ensureGuest,(req, res) => {

    res.render('login', {
        layout: 'login',
    })
})

router.get('/profile', ensureAuth, async(req, res) => {

    try{
        const assignments = await Assignment.find({ user: req.user.id}).lean()
        res.render('profile', {
            name: req.user.displayName,
            image: req.user.image,
            assignments
        });
        console.log(req.user)

    }catch(err){

        console.error('err')
        res.render('/error')

    }

    
})

router.get('/assignmentList', ensureAuth, async(req, res) => {

    try{
        const assignments = await Assignment.find({ user: req.user.id}).lean()
        const milestones = await Milestone.find({ user: req.user.id}).lean()
        res.render('assignmentList', {
            name: req.user.displayName,
            image: req.user.image,
            assignments,
            milestones
        });
        console.log(req.user)

    }catch(err){

        console.error('err')
        res.render('/error')

    }

    
})

module.exports = router