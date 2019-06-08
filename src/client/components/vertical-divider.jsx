import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    divider: {
        color:"inherit",
        borderRight: '1px solid white',
        padding: '1px',
        height: '40px'
    }
};

class VerticalDivider extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.divider}></div>
        );
    }
}

VerticalDivider.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VerticalDivider);
