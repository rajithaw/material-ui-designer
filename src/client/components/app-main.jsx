import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import Header from './layout/header';
import Content from './layout/content';
import LeftDrawer from './layout/left-drawer';
import RightDrawer from './layout/right-drawer';

import qs from 'query-string';

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

@inject('projectStore')
@observer
class AppMain extends React.Component {
    componentDidMount() {
        const { projectStore, location } = this.props;
        const query = qs.parse(location.search);

        // load project and page
        projectStore.loadProjectAndPage(query.project, query.page);
    }

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
    classes: PropTypes.object.isRequired,
    projectStore: PropTypes.object,
    location: PropTypes.object
};

export default withStyles(styles)(AppMain);
