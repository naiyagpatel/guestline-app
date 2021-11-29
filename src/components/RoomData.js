import React, { useState, useEffect } from "react";
function RoomData(props) {
  const [roomData, setRoomData] = useState([]);
  const [ratePlans, setRatePlans] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { hotelId, adults, child } = props;
  useEffect(() => {
    setLoading(true);
    const url =
      "https://obmng.dbm.guestline.net/api/roomRates/OBMNG/" + hotelId;
    fetch(url)
      .then((res) => {
        const response = res.json();
        // console.log("api data:", response);
        setLoading(false);

        return response;
      })
      .then((result) => {
        // console.log("api data after promise:", result);

        setRoomData(result.rooms);
        setRatePlans(result.ratePlans);
        // console.log("api Room data after condition:", roomData);
        // console.log("api rate Plans data:", ratePlans);
      })

      .catch((error) => {
        setHasError(true);
        setLoading(false);
        console.log(error);
      });
  }, [hotelId]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : hasError ? (
        <div>Error occured.</div>
      ) : roomData.length > 0 ? (
        roomData.map((data) => {
          if (
            adults <= data.occupancy.maxAdults &&
            child <= data.occupancy.maxChildren
          ) {
            return (
              <div className="flex-container">
                <div className="flex-item-left">
                  <h5>Room Type: {data.name}</h5>
                  <h6>Max Adults: {data.occupancy.maxAdults}</h6>
                  <h6>Max Children: {data.occupancy.maxChildren}</h6>
                </div>
                <div className="flex-item-right">
                  <h6>{data.longDescription}</h6>
                </div>
              </div>
            );
          }
          // else {
          //   return (
          //     <div className="flex-container">
          //       <h6> No Rooms available...</h6>
          //     </div>
          //   );
          // }
        })
      ) : (
        <div>
          <h6> Sorry, No rooms available...</h6>
        </div>
      )}
    </div>
  );
}

export default RoomData;
