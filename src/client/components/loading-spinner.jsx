import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { observer, inject } from "mobx-react";

const styles = {
    loadingSpinnerWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        zIndex: "9999999999",
        backgroundColor: "rgba(255,255,255,0.5)"
    },
    loadingSpinner: {
        width: "60px",
        height: "60px",
        left: "50%",
        top: "50%",
        position: "absolute",
        marginLeft: "-30px",
        marginTop: "-30px",
        zIndex: "9999999999"
    }
};

@inject("rootStore")
@observer
class LoadingSpinner extends React.Component {
    render() {
        const { classes, rootStore } = this.props;
        const { isBusy } = rootStore;
        return (
            <div
                className={classes.loadingSpinnerWrapper}
                style={{ display: isBusy ? "block" : "none" }}
            >
                <div className={classes.loadingSpinner}>
                    <CircularProgress color="primary" thickness={5} size={60} />
                </div>
            </div>
        );
    }
}

LoadingSpinner.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object
}

export default withStyles(styles)(LoadingSpinner);
