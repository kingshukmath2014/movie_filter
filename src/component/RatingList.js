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

const RatingList = (props) => {
  const [state, setState] = useState([
    { value: 0, isChecked: false },
    { value: 1, isChecked: false },
    { value: 2, isChecked: false },
    { value: 3, isChecked: false },
    { value: 4, isChecked: false },
    { value: 5, isChecked: false },
    { value: 6, isChecked: false },
    { value: 7, isChecked: false },
    { value: 8, isChecked: false },
    { value: 9, isChecked: false },
    { value: 10, isChecked: false },
  ]);

  useEffect(() => {
    var ratingList = JSON.parse(localStorage.getItem("ratingList"));
    var newArr = [...state];
    if (ratingList) {
      ratingList.map((item) => {
        newArr[item.value].isChecked = true;
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
    localStorage.setItem("ratingList", JSON.stringify(checkArr));
    props.getData(checkArr);
  };

  const classes = useStyles();
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      {state &&
        state.length > 0 &&
        state.map((item, i) => {
          return (
            <div key={i} style={{ position: "relative", top: "-10px" }}>
              {item.value === 0 ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.isChecked}
                      onChange={(e) => handleChange(e, item.value)}
                      icon={<span className={classes.icon} />}
                      checkedIcon={
                        <span className={(classes.icon, classes.checkedIcon)} />
                      }
                      value={item.value}
                      color="primary"
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px" }}>{"Any rating"}</span>
                  }
                />
              ) : (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={item.isChecked}
                      onChange={(e) => handleChange(e, item.value)}
                      icon={<span className={classes.icon} />}
                      checkedIcon={
                        <span className={(classes.icon, classes.checkedIcon)} />
                      }
                      value={item.value}
                      color="primary"
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px" }}>
                      {ratings &&
                        ratings.length > 0 &&
                        ratings.map((cont, ind) => {
                          return cont <= i ? (
                            <StarIcon key={ind} fontSize="small" />
                          ) : (
                            <StarBorderIcon key={ind} fontSize="small" />
                          );
                        })}
                    </span>
                  }
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default RatingList;
