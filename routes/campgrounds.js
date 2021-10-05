const express = require('express');
const router = express.Router();

const campgrounds = require('../controllers/campgrounds.js')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
   .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;




// images: [
//     {
//       url: 'https://res.cloudinary.com/de7i25hsd/image/upload/v1633441841/MyCamp/nz7xqsx7waen0fau0oei.jpg',
//       filename: 'MyCamp/nz7xqsx7waen0fau0oei',
//       _id: new ObjectId("615c5834fdc59cb97841b171")
//     },
//     {
//       url: 'https://res.cloudinary.com/de7i25hsd/image/upload/v1633441843/MyCamp/yt1jkrh3y4edjeqd7py2.jpg',
//       filename: 'MyCamp/yt1jkrh3y4edjeqd7py2',
//       _id: new ObjectId("615c5834fdc59cb97841b172")
//     }
//   ],
