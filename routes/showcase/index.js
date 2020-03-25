const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', (req, res) => {
    db.collection('images').find({checked: true}).toArray()
    .then(images => {
        res.render('showcase', { template: 'showcase', images })
    })
})

module.exports = router