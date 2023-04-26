var express = require('express');
var router = express.Router();

const Celebrity= require('../models/Celebrity.model')

const Movie = require('../models/Movie.model')

router.get('/all-movies', (req, res, next) => {

    Movie.find()
    .then((movies) => {
        res.render('movies/movies.hbs', {movies})
    })
    .catch((err)=>{
        console.log(err)
    })
  });


  router.get('/add-movies', (req, res, next) => {
Celebrity.find()
.then((celebrities) => {
    res.render('movies/new-movie.hbs', {celebrities})
})
.catch((err) => {
    console.log(err)
})
  });

router.post('/add-movie',(req, res, next) =>{

let {title, genre, plot, cast}= req.body

    Movie.create({
        title,
        genre,
        plot,
        cast
    })
    .then((createdeMovie) =>{
        console.log("Created movie", createdeMovie)
        res.redirect('/movies/all-movies')
    })
    .catch((err) =>{
        console.log(err)
    })
} )

module.exports = router;