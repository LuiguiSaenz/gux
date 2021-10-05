import React from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

function CircularLoading({ ...props }) {
  const { height, width, color } = props;
  return (
    <ReactLoading
      type="spin"
      color={color}
      height={window.innerWidth > 480 ? height : 20}
      width={window.innerWidth > 480 ? width : 20}
    />
  );
}

CircularLoading.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

CircularLoading.defaultProps = {
  color: "#232f3e",
};

export default CircularLoading;
