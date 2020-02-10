const express = require('express')
const router = express.Router()
const {movieControllers} = require('../controllers')


// http://localhost:2020/movie/getmovies
router.get('/getmovies', movieControllers.getMovie)

// http://localhost:2020/movie/getmovies/:params
router.get('/getmovies/:id', movieControllers.getMovieById)

// http://localhost:2020/movie/deletemovie/:params
router.delete('/deletemovie/:id', movieControllers.deleteMovie)

// http://localhost:2020/movie/addmovie
router.post('/addmovie', movieControllers.addMovie)

// http://localhost:2020/movie/editmovie/:params
router.put('/editmovie/:id', movieControllers.editMovie)


module.exports = router