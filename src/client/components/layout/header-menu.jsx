import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ProjectsDialog from '../project/projects-dialog';
import CopyProjectDialog from '../project/create-project-dialog';

const styles = {
    moreColor: {
        color: 'white'
    }
};

@inject('authStore', 'projectStore')
@observer
class HeaderMenu extends React.Component {
    state = {
        anchorEl: null,
        copyProjectDialogOpen: false
    };

    render() {
        const { classes, projectStore, authStore } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : null}
                    aria-haspopup="true"
                    className={classes.moreColor}
                    onClick={this.handleClick}
                >
                    <MenuIcon /> 
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    transformOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={open}
                    onClick={this.handleClose}
                    onClose={this.handleClose}
                >
                    <MenuItem 
                        onClick={this.loginHandler}
                        disabled={authStore.isAuthenticated}
                    >
                        Log in
                    </MenuItem>
                    <MenuItem 
                        onClick={this.logoutHandler}
                        disabled={!authStore.isAuthenticated}
                    >
                        Log out
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={this.projectListHandler}>Project List</MenuItem>
                    <MenuItem 
                        onClick={this.copyProjectHandler}
                        disabled={!authStore.isAuthenticated || !projectStore.selectedProject.id}
                    >
                        Copy Project
                    </MenuItem>
                    <MenuItem
                        component="a"
                        target="_blank"
                        href={`/api/export/${projectStore.selectedProject.id}`} 
                        disabled={!projectStore.selectedProject.id}
                    >
                        Export Project
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={this.helpHandler}>Help</MenuItem>
                </Menu>
                <ProjectsDialog/>
                <CopyProjectDialog
                    open={this.state.copyProjectDialogOpen}
                    okCallback={this.handleCopyProjectOk}
                    cancelCallback={this.handleCopyProjectClose}
                />
            </div>
        );
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    loginHandler = () => {
        this.props.authStore.loginWithPopup();
    };

    logoutHandler = () => {
        this.props.authStore.logout({
            returnTo: window.location.origin
        });
    };

    projectListHandler = () => {
        this.props.projectStore.setProjectsDialogOpen(true);
    };

    copyProjectHandler = () => {
        this.setState({
            copyProjectDialogOpen: true
        });
    }

    handleCopyProjectOk = (result) => {
        const { projectStore } = this.props;

        projectStore.copyProject(projectStore.selectedProject.id, result.projectName);
        this.handleCopyProjectClose();
    }

    handleCopyProjectClose = () => {
        this.setState({
            copyProjectDialogOpen: false
        });
    }

    helpHandler = () => {
        document.open('https://github.com/rajithaw/material-ui-designer/blob/master/README.md','', 'noopener=true')
    };
}

HeaderMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    authStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default withStyles(styles)(HeaderMenu);
