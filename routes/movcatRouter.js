const express = require('express')
const router = express.Router()
const { movcatControllers } = require('../controllers')

// http://localhost:2020/movcat/getmovcat
router.get('/getmovcat', movcatControllers.getMovCat)

// http://localhost:2020/movcat/getmovcat?nama=query
router.get('/getmovcatbymovie', movcatControllers.getMovCatByMovie)

// http://localhost:2020/movcat/deletemovcat/:params
router.delete('/deletemovcat/:id', movcatControllers.deleteMovCat)

// http://localhost:2020/movcat/addmovcat
router.post('/addmovcat', movcatControllers.addMovCat)


module.exports = router