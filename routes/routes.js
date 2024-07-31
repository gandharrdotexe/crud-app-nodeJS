const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

//image upload
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads');
    },
    filename: function(req, file, callback){
        callback(null, file.fieldname+"_"+Date.now()+'_'+file.originalname);
    }
});

var upload  = multer({
    storage: storage
}).single('image'); 

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', { title: 'Home Page', users: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//insert an use rin databse
router.post('/add', upload, async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
        });
        await user.save();
        req.session.message = {
            type: 'success',
            message: 'User added successfully'
        };
        console.log(req.session.message);
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});


router.get('/add', (req,res)=>{
    res.render('add_users', {title: 'Add Users'})
});

router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.redirect('/');
        } else {
            res.render('edit_users', { title: 'Edit User Info', user });
        }
    } catch (err) {
        res.redirect('/');
    }
});


module.exports = router;