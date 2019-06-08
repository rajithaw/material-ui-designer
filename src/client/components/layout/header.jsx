import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import { AppBar, Toolbar } from '@material-ui/core';

import HeaderMenu from './header-menu';
import Logo from '../../../static/images/material-ui-logo.svg';
import DesignerToolbar from '../designer/designer-toolbar';
import ProjectToolbar from '../project/project-toolbar';
import PagesToolbar from '../pages/pages-toolbar';
import VerticalDivider from '../vertical-divider';

const styles = theme => ({
    appBar: {
        position: 'fixed',
        zIndex: theme.zIndex.drawer + 1
    },
    appBarLogo: {
        verticalAlign: 'middle',
        display: 'inline-block',
        color: 'white'
    },
    appTitle: {
        flex: '1',
        marginLeft: '10px',
        color: 'white'
    }
});

@inject('rootStore')
@observer
class Header extends React.Component {
    render() {
        const { classes, rootStore } = this.props;

        return (
            !rootStore.isPreviewMode &&
            <AppBar className={classes.appBar} color="primary">
                <Toolbar>
                    <img src={Logo} className={classes.appBarLogo} alt="material ui logo" width="48px" height="48px" />
                    <Typography variant="h6" className={classes.appTitle}>
                        Material UI Designer
                    </Typography>
                    <ProjectToolbar />
                    <VerticalDivider />
                    <PagesToolbar />
                    <VerticalDivider />
                    <DesignerToolbar />
                    <VerticalDivider />
                    <HeaderMenu />
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object
}

export default withStyles(styles)(Header);
