import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import Header from './layout/header';
import Content from './layout/content';
import LeftDrawer from './layout/left-drawer';
import RightDrawer from './layout/right-drawer';

const styles = {
    root: {
        flexGrow: 1,
        height: 'calc(100vh - 20px)',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    }
};

@observer
class AppMain extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Header />
                <LeftDrawer />
                <Content />
                <RightDrawer />
            </div>
        );
    }
}

AppMain.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppMain);
