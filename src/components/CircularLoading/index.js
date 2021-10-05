import React from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

function CircularLoading({ ...props }) {
  const { height, width, color } = props;
  return (
    <Grid container justifyContent="center" direction="column" alignItems="center">
      <ReactLoading
        type="spin"
        color={color}
        height={window.innerWidth > 480 ? height : 20}
        width={window.innerWidth > 480 ? width : 20}
      />
      <p>Cargando...</p>
    </Grid>
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
