import React from "react";

function Rating({
  count,
  value,
  inactiveColor = "#ddd",
  size = 25,
  activeColor = "black",
  onChange,
}) {
  // short trick to create star
  const stars = Array.from({ length: count }, () => "🟊");

  // Internal handle change function
  const handleChange = (value) => {
    onChange(value + 1);
  };

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style = activeColor;
        }
        return (
          <span
            className={"star"}
            key={index}
            style={{ color: style, width: size, height: size, fontSize: size }}
            onClick={() => handleChange(index)}
          >
            {s}
          </span>
        );
      })}
      {/* {value} */}
    </div>
  );
}

export default Rating;
