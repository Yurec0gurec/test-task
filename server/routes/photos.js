const express = require('express');
const router = express.Router();

const PhotoService = require('../services/PhotoService');


// READ
// this api end-point of an API returns JSON data array
router.get('/', async (req, res) => {
    // if (req.query.photoTitleSubstring) {
    //     res.status(200).json(PhotoService.getAutoSuggestUsers(req.query.photoTitleSubstring));
    //     return;
    // }
    const iPageNumber = req.query.page ? req.query.page : 1;
    try {
        const users = await PhotoService.getPhotosPack(iPageNumber);
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;