const express = require('express')
const router = express.Router({ mergeParams: true })

const filterImages = (query, array) => {
    if (!query) {
        return false
    }

    if (typeof query.i === 'string') {
        return [array[query.i]]
    } else {
        let filteredArray = []
        query.i.forEach(index => {
            filteredArray.push(array[index])
        })
        return filteredArray
    }
}

router.get('/', (req, res) => {
    db.collection('images').find({}).toArray()
    .then(imageArray => {
        let images
        console.log(Object.keys(req.query).length === 0)

        if ( Object.keys(req.query).length !== 0 ) {
            // If there are any keys inside the query
            images = filterImages(req.query, imageArray)
        } else {
            // If the query is empty
            images = imageArray
        }

        console.log(images)
        return res.render('carousel', { template: 'carousel', images })
     })
})

module.exports = router