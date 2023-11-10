import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const AlertComponent = ({ alerts }) => {
  return (
    <div>
      {alerts &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert severity={alert.alertType} key={alert.id}>
            {alert.msg}
          </Alert>
        ))}
    </div>
  );
};

AlertComponent.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(AlertComponent);
