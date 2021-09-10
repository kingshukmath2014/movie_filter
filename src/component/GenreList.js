import React, { useState, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

const GenreList = (props) => {
  const classes = useStyles();
  const [state, setState] = useState([
    { name: "Any genrey", isChecked: false },
    { name: "Action", isChecked: false },
    { name: "Comedy", isChecked: false },
    { name: "Drama", isChecked: false },
    { name: "Thriller", isChecked: false },
  ]);

  useEffect(() => {
    var genreList = JSON.parse(localStorage.getItem("genreList"));
    var newArr = [...state];
    if (genreList) {
      genreList.map((item, i) => {
        for (let i = 0; i < newArr.length; i++) {
          if (item.name == newArr[i].name) {
            newArr[i].isChecked = true;
          }
        }
      });
      setState(newArr);
    }
  }, []);

  const handleChange = (event, i) => {
    var newArr = [...state];
    if (i === 0) {
      if (!newArr[0].isChecked) {
        state.map((item, k) => {
          if (k === 0) newArr[k].isChecked = !newArr[k].isChecked;
          else newArr[k].isChecked = true;
        });
      } else newArr[i].isChecked = !newArr[i].isChecked;
    } else {
      newArr[i].isChecked = !newArr[i].isChecked;
    }
    setState(newArr);
    const checkArr = newArr.filter((item) => {
      if (item.isChecked) {
        return item;
      }
    });
    localStorage.setItem("genreList", JSON.stringify(checkArr));
    props.getData(checkArr);
  };

  return (
    <>
      {state.map((item, i) => {
        return (
          <div key={i}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isChecked}
                  onChange={(e) => handleChange(e, i)}
                  icon={<span className={classes.icon} />}
                  checkedIcon={
                    <span className={(classes.icon, classes.checkedIcon)} />
                  }
                  value={item.name}
                  color="primary"
                />
              }
              label={<span style={{ fontSize: "14px" }}>{item.name}</span>}
            />
          </div>
        );
      })}
    </>
  );
};

export default GenreList;
