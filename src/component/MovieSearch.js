import React, { useState, useEffect, useMemo } from "react";
import "../css/moviesearch.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MovieList from "./MovieList";
import RatingList from "./RatingList";
import GenreList from "./GenreList";
import { movie } from "../data";

const MovieSearch = () => {
  const [openRating, setOpenrating] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [movieList, setMovieList] = useState(movie);

  const openRatingDiv = () => {
    setOpenrating(!openRating);
    setGenreOpen(false);
  };
  const openListDiv = () => {
    setOpenList(true);
  };
  const filterName = (e) => {
    localStorage.setItem("movieName", e.target.value);
    filterMovie();
  };
  const openGenreDiv = () => {
    setGenreOpen(!genreOpen);
    setOpenrating(false);
  };
  const HandleData = (dt) => {
    localStorage.setItem("rating", JSON.stringify(dt));
    setOpenList(true);
    filterMovie();
  };
  const HandleData1 = (dt) => {
    localStorage.setItem("genre", JSON.stringify(dt));
    setOpenList(true);
    filterMovie();
  };
  const filterMovie = () => {
    var output = movie;
    var movieName = localStorage.getItem("movieName");
    var rating = JSON.parse(localStorage.getItem("rating"));
    var genre = JSON.parse(localStorage.getItem("genre"));
    if (movieName) {
      output = movie.filter((data) => {
        return data.title.toLowerCase().includes(movieName.toLowerCase());
      });
    }
    if (rating) {
      if (rating.length > 0) {
        output = output.filter((data) => {
          for (let i = 0; i < rating.length; i++) {
            if (Math.floor(data.rating) == rating[i].value) {
              return data;
            }
          }
        });
      }
    }
    if (genre) {
      if (genre.length > 0) {
        output = output.filter((data) => {
          for (let i = 0; i < genre.length; i++) {
            if (data.category == genre[i].name) {
              return data;
            }
          }
        });
      }
    }
    setMovieList(output);
  };

  useMemo(() => {
    localStorage.removeItem("movieName");
    localStorage.removeItem("rating");
    localStorage.removeItem("ratingList");
    localStorage.removeItem("genre");
    localStorage.removeItem("genreList");
  }, []);

  return (
    <div
      className="search-container"
      style={{
        minHeight: genreOpen ? "230px" : "auto",
      }}
    >
      <div className="name-container">
        <input
          type="text"
          name="movie_name"
          onChange={(e) => filterName(e)}
          onFocus={() => openListDiv()}
          autoComplete="off"
        />
      </div>
      <div className="dropdown-container" onClick={() => openRatingDiv()}>
        <span>Rating</span>
        <span className="dropdown-arrow">
          {openRating ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </span>
      </div>
      <div className="dropdown-container" onClick={() => openGenreDiv()}>
        <span>Genre</span>
        <span className="dropdown-arrow">
          {genreOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </span>
      </div>
      {openList && (
        <div
          className="movielist-container"
          style={{
            minHeight: genreOpen ? "170px" : "auto",
          }}
        >
          {movieList && movieList.length > 0 ? (
            movieList.map((item, i) => {
              return <MovieList key={i} data={item} />;
            })
          ) : (
            <div className="error-data">No data found</div>
          )}
        </div>
      )}
      {openRating && (
        <div className="rating-container">
          <RatingList getData={HandleData} />
        </div>
      )}
      {genreOpen && (
        <div className="genre-container">
          <GenreList getData={HandleData1} />
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
