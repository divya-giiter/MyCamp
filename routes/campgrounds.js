const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor, isReviewAuthor} = require('../middleware');

const Campground = require('../models/campground');

router.get('/', catchAsync ( async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds }); 
}));

router.get('/new', isLoggedIn, (req, res) => {
      res.render('campgrounds/new'); 
 });

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const campground =new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Succesfully made a New Campground');
    res.redirect(`/campgrounds/${campground._id}`);

}));

router.get('/:id', isReviewAuthor, catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
    populate: {
        path: 'author'
    }}).
    populate('author');
    if(!campground){
        req.flash('error', 'Cannot Find the Requested Campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}))

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync( async (req, res) => {
    const { id } = req.params.id;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Cannot Find the Requested Campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id }= req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground} );
    req.flash('success', 'Succesfully Updated Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync( async(req,res) => {
    const { id }= req.params;
    const campground = await Campground.findByIdAndDelete(id);
    if(!campground){
        req.flash('error', 'Cannot Find the Requested Campground');
        return res.redirect('/campgrounds');
    }else req.flash('success', 'Succesfully Deleted Campground');
    res.redirect('/campgrounds');
}))

module.exports = router;