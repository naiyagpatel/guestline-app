import React, { useState, useEffect } from "react";
import logo from "./logo.PNG";
import "./App.css";

import Rating from "./components/Rating";

import HotelPreview from "./components/HotelPreview";

function App() {
  const [rating, setRating] = useState(3);
  const [data, setData] = useState({});

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [adults, setAdults] = useState(2);
  const [child, setChild] = useState(0);
  useEffect(() => {
    setLoading(true);
    fetch("https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG")
      .then((res) => {
        const response = res.json();

        setLoading(false);

        return response;
      })
      .then((result) => {
        // console.log("api data:", result);
        setData(result);
      })

      .catch((error) => {
        setHasError(true);
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleChange = (value) => {
    setRating(value);
  };
  const getRatingData = () => {
    // console.log(data);
    const ratingData = [];
    for (let i in data) {
      if (parseInt(data[i]["starRating"]) >= rating) {
        ratingData.push(data[i]);
      }
    }
    // console.log("Rating Data:", ratingData);
    return ratingData;
  };

  return (
    <div className="App">
      <img src={logo} alt="logo" />
      <div className="header">
        <div>
          <Rating
            count={5}
            size={30}
            value={rating}
            activeColor={"black"}
            inactiveColor={"#ddd"}
            onChange={handleChange}
          />
        </div>
        <div>
          <h5>
            Adults:
            <button type="button" onClick={() => setAdults(adults + 1)}>
              {/* <button type="button" onClick={addNewAdult()}> */}+
            </button>
            {adults}
            <button
              type="button"
              onClick={() => setAdults(adults > 1 ? adults - 1 : adults)}
            >
              {/* <button type="button" onClick={minusAdult(adults)}> */}-
            </button>
          </h5>
        </div>
        <div>
          <h5>
            Children:
            <button type="button" onClick={() => setChild(child + 1)}>
              {/* <button type="button" onClick={addChild(child)}> */}+
            </button>
            {child}
            {/* <button type="button" onClick={minusChild(child)}> */}
            <button
              type="button"
              onClick={() => setChild(child > 0 ? child - 1 : child)}
            >
              -
            </button>
          </h5>
        </div>
      </div>
      <div>
        <br />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : hasError ? (
        <div>Error occured.</div>
      ) : (
        <HotelPreview
          RatingData={getRatingData()}
          rating={rating}
          adults={adults}
          child={child}
        />
      )}

      <footer>
        <p>
          Author: Naiya Patel <br />
          Created with React
        </p>
      </footer>
    </div>
  );
}

export default App;
