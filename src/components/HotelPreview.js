import React from "react";

import RatingImage from "./RatingImage";
import RoomData from "./RoomData";

const HotelPreview = (props) => {
  const { RatingData, adults, child } = props;

  return (
    <div>
      {RatingData.map((data) => (
        <div>
          <div>
            <br />
          </div>
          <div className="border">
            <div className="flex-cont">
              <div className="flex-img">
                {data.images.map((res) => {
                  return (
                    <img
                      className="img-padding"
                      src={res.url}
                      height="100px"
                      width="100px"
                      alt="hotel"
                    />
                  );
                })}
              </div>

              <div className="flex-details">
                <h4>{data.name}</h4>

                <h5>{data.address1}</h5>
                <h6>{data.address2}</h6>
              </div>
              <div className="flex-right">
                <RatingImage
                  count={5}
                  size={20}
                  value={parseInt(data.starRating)}
                  activeColor={"black"}
                  inactiveColor={"#ddd"}
                />
              </div>
            </div>

            <RoomData hotelId={data.id} adults={adults} child={child} />
          </div>
        </div>
      ))}

      <hr />
    </div>
  );
};

export default HotelPreview;
