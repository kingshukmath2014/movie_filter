import React from "react";
import "../css/movielist.scss";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";

const MovieList = (props) => {
  var ratArr = [];
  for (let i = 1; i <= 10; i++) {
    if (Math.floor(props.data.rating) >= i) {
      if (props.data.rating > i && props.data.rating < i + 1)
        ratArr.push(<StarHalfIcon key={i} fontSize="small" />);
      else ratArr.push(<StarIcon key={i} fontSize="small" />);
    } else ratArr.push(<StarBorderIcon key={i} fontSize="small" />);
  }
  return (
    <div style={{ marginTop: "10px" }}>
      <div className="li_container">
        <span>{props.data.title}</span>
        <span className="movie-type">{props.data.category}</span>
      </div>
      <div>{ratArr}</div>
    </div>
  );
};

export default MovieList;
