const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => { // the '/' represents api/items because we're already in the folder
    // want to fetch items from database
    Item.find()
    .sort({ date: -1})
    .then(items => res.json(items))

}); 

// @route   POST api/items
// @desc    Create A Post
// @access  Public
router.post('/', (req, res) => { // the '/' represents api/items because we're already in the folder
    
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
}); 

// @route   POST api/items
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove()
    .then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});



// We must do this otherwise no other file can read into here?
module.exports = router;