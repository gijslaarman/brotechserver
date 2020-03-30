const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', (req, res) => {
    db.collection('images').find({checked: true}).toArray()
    .then(images => {
        images = images.map((image, index) => {
            if (index !== 0) {
                image.previous = (index - 1).toString()
            }

            if (index !== (images.length - 1)) {
                image.next = (index + 1).toString()
            }

            return image
        })

        console.log(images)

        res.render('showcase', { template: 'showcase', images })
    })
})

module.exports = router