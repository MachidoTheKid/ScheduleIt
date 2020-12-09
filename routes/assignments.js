const { render } = require('ejs');
const express= require('express');
const router = express.Router();
const { ensureAuth } = require("../middleware/auth")

const Assignment = require('../models/Assignment')
const Milestone = require ('../models/Milestone')

router.get('/add', ensureAuth,(req, res) => {

    res.render('assignments/add');
    //console.log(req.user);
})

router.get('/addmilestone', ensureAuth,(req, res) => {

    res.render('assignments/addmilestone');
    //console.log(req.user);
})


router.get('/assignmentList', ensureAuth,(req, res) => {

    res.render('assignments/assignmentList');
    //console.log(req.user);
})

//Get Assignment ID
router.get('/:id', ensureAuth, async (req, res) => {
try{

    let assignment = await Assignment.findById(req.params.id).populate('user').lean()

    if(!assignment){
        return res.render('error')
    }

    res.render('assignments/viewAssignment',{
        assignment,
    })

}catch(err){

    console.error(err);
    res.render('error');
}
})

//Create Assignment
router.post('/', ensureAuth, async (req, res) =>{
    try{
        req.body.user = req.user._id;
        await Assignment.create(req.body)
        res.redirect('/profile')
        console.log(req.body);
        //console.log(req.user)

    }catch(err){

        console.log(err)
        res.render('error')

    }

}) 

//Create Milestone
router.post('/', ensureAuth, async (req, res) =>{
    try{
        req.body.user = req.user._id;
        await Milestone.create(req.body)
        res.redirect('assignmentList')
        console.log(req.body);
        //console.log(req.user)

    }catch(err){

        console.log(err)
        res.render('error')

    }

}) 


router.get('/edit/:id', ensureAuth, async (req, res) => {

    const assignment = await Assignment.findOne({

        _id: req.params.id

    }).lean()

    if(!assignment){
        return res.render('error')
    


    }else{
        res.render('assignments/edit',{

            assignment,


        })
        console.log(assignment);
    }
})

router.put('/:id', ensureAuth, async (req, res) => {

    let assignment = await Assignment.findById(req.params.id).lean()
    //console.log(req.user);

    if(!assignment){
        return res.render('error')
    


    }else{

            assignment = await Assignment.findOneAndUpdate({_id: req.params.id}, req.body, {

                new: true,
                runValidators: true
            })
       
        res.redirect('/profile')
        console.log(assignment);
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {

    try{

        await Assignment.remove({_id :req.params.id})
        res.redirect('/profile')

    }catch(err){

        console.error(err);
        res.render('error')
    }
})

module.exports = router