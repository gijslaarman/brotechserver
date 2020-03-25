const express = require('express')
const router = express.Router({ mergeParams: true })
const multer = require('multer')
const upload = multer()
const fs = require('fs')
const dataPath = 'saved-carousel.json'

router.get('/', (req, res) => {
    db.collection('images').find({}).toArray()
    .then(imageArray => {
        const images = imageArray
        console.log(imageArray)
        return res.render('carousel', { template: 'carousel', images })
     })
})

router.post('/save', upload.none(), (req, res) => {
    db.collection('images').find({}).forEach(image => {
        if (req.body.saveSelection) { // Is there an array or string? If not skip and set everything to false -> Because the user turned all the images off.

            if (typeof req.body.saveSelection === 'string') { // We can't use the find function on a string, so if the answer is a string reform it into an array.
                req.body.saveSelection = [req.body.saveSelection]
            }

            if (req.body.saveSelection.find(i => i === image.filename)) {
                image.checked = true
            } else {
                image.checked = false
            }

        } else {
            image.checked = false
        }

        console.log(image)
        db.collection('images').save(image)
    })

    res.redirect('/carousel')
})

module.exports = router