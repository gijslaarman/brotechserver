const express = require('express')
const multer = require('multer')
const router = express.Router({ mergeParams: true })
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })
const storeImage = upload.single('image')

router.get('/', (req, res) => {
    db.collection('images').find({}).toArray()
        .then(images => {
            if (images.length === 0) {
                return res.render('index', { template: 'index', images, noneFound: true })
            }
            res.render('index', { template: 'index', images })
        })
})

router.post('/upload-image', storeImage, (req, res) => {
    db.collection('images').insertOne({
        filename: req.file.filename,
        alt: req.body.alt,
        src: `/uploads/${req.file.filename}`,
        caption: req.body.caption,
        checked: false
    }).then(() => {
        console.log(`Someone inserted the image: ${req.file.filename}`)
        res.redirect('/')
    })
})

router.post('/delete-image/:file', (req, res) => {
    const path = `public/uploads/${req.params.file}`

    db.collection('images').deleteOne({ filename: req.params.file })
        .then(() => {
            fs.unlink(path, err => {
                if (err) {
                    console.error(err)
                }
            })

            console.log(`Someone deleted the image: ${req.params.file}`)
            res.redirect('/')
        })
})

module.exports = router