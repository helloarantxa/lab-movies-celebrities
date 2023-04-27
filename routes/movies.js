var express = require("express");
var router = express.Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/all-movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies.hbs", { movies });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/add-movies", (req, res, next) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("movies/new-movie.hbs", { celebrities });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/add-movies", (req, res, next) => {
    let { title, genre, plot, cast } = req.body;
  
    Movie.create({
      title,
      genre,
      plot,
      cast,
    })
      .then((createdeMovie) => {
        console.log("Created movie", createdeMovie);
        res.redirect("/movies/all-movies");
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/movie-details/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details.hbs", movie);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/delete/:id", (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndDelete(id)
      .then((movie) => {
        res.redirect("/movies/all-movies");
      })
      .catch((err) => {
        console.log(err);
      });
  });


  router.get("/edit/:id", (req, res) => {
    const { id } = req.params;
  
    Movie.findById(id).then((movie) => {
      Celebrity.find().then((celebs) => {
        let remainingCelebs = celebs.filter(
          (cur) => !movie.cast.includes(cur._id)
        );
        let starringCelebs = celebs.filter((cur) => movie.cast.includes(cur._id));
  
        res.render("movies/edit-movie.hbs", {
          movie,
          remainingCelebs,
          starringCelebs,
        });
      });
    });
  });


router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, req.body, { new: true })
    .then((movie) => {
      res.redirect(`/movies/movie-details/${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
