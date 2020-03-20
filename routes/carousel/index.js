const express = require('express')
const router = express.Router({ mergeParams: true })
const multer = require('multer')
const upload = multer()
const fs = require('fs')
// const filterImages = (query, array) => {
//     if (!query) {
//         return false
//     }

//     if (typeof query.i === 'string') {
//         return [array[query.i]]
//     } else {
//         let filteredArray = []
//         query.i.forEach((no, index) => {
//             let object = array[index]
            
            
//             if (index > 0) {
//                 // Does this image need a previous button?
//                 object.previous = Number(index) - 1
//             }
            
//             // console.log(index, (query.i.length - 1))
            
//             if (index < (query.i.length - 1)) {
//                 // Does this image need a next button, if it's the end of the carousel it does not need a next button.
//                 object.next = Number(index) + 1
//             }

//             filteredArray.push(object)
//         })
//         return filteredArray
//     }
// }

router.get('/', (req, res) => {
    db.collection('images').find({}).toArray()
    .then(imageArray => {
        const images = imageArray
        return res.render('carousel', { template: 'carousel', images })
     })
})

router.post('/save', upload.none(), (req, res) => {
    // Make sure to always save it as an array.
    if (typeof req.body.saveSelection === 'string') {
        req.body.saveSelection = [req.body.saveSelection]
    }

    // Write the saved setup to the server.
    fs.writeFile('saved-carousel.json', JSON.stringify(req.body), 'utf8', () => {
        console.log('Succesfully saved carousel.')
    })

    res.redirect('/carousel')
})

module.exports = router