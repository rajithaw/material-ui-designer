import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    toolbarContent: {
        color: 'white',
        paddingRight: '5px',
        paddingLeft: '18px',
        display: 'inline-block'
    }
};

@withStyles(styles)
@inject('authStore')
@observer
class ProfileToolbar extends React.Component {

    render() {
        const { classes, authStore } = this.props;

        return (
            <div >
                <Typography variant="subtitle1" className={classes.toolbarContent}>
                    { authStore.isAuthenticated && authStore.user ? authStore.user.name : '' }
                </Typography>
            </div>
        );
    }
}

ProfileToolbar.propTypes = {
    classes: PropTypes.object,
    authStore: PropTypes.object
}

export default ProfileToolbar;
