import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import "../assets/css/counter.css";
require("dotenv").config();

const Screen = (props) => {
  if (isNaN(props.value)) return <span>This is not a valid number</span>;
  else return <span>Counter Value : {props.value}</span>;
};

const Counter = () => {
  const MAX = process.env.REACT_APP_MAX_VALUE ?? 1000;
  console.log("env", process.env.REACT_APP_MAX_VALUE);
  const [count, setCount] = useState(1);
  const [showLoader, setshowLoader] = useState(false);
  const inputRef = React.useRef();
  useEffect(() => {
    axios
      .get(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json"
      )
      .then((response) => {
        if (response.data) {
          setCount(response.data);
        }
      });
  }, []);

  useEffect(() => {
    setshowLoader(true);
    const counterAPIValue = { naveen_17311009: count };
    axios
      .put(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
        counterAPIValue
      )
      .then((response) => {
        setshowLoader(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const incrementCount = () => {
    if (isNaN(count)) setCount(1);
    else {
      if (count >= MAX) {
        setCount(MAX);
      } else setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (isNaN(count)) setCount(1);
    else {
      setCount(count - 1);
    }
  };

  const handleChange = (event) => {
    if (parseInt(event.target.value, 10) > MAX) {
      setCount(MAX);
    } else setCount(parseInt(event.target.value, 10));
  };

  return (
    <div className="app">
      <div>
        <div className="loader">
          {showLoader ? (
            <div>
              <div className="spinner"></div>
              <span>Saving counter value</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="buttons">
          <div className="decr">
            <Button title={"-"} action={decrementCount} />
          </div>
          <div className="screen">
            <input
              ref={inputRef}
              type="number"
              value={count}
              onChange={handleChange}
            />
          </div>
          <div className="incr">
            <Button title={"+"} action={incrementCount} />
          </div>
        </div>
        <div className="info">
          <Screen value={count} />
        </div>
      </div>
    </div>
  );
};
export default Counter;
