import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import AddContents from '@material-ui/icons/PlaylistAdd';

import AddContentDialog from './add-content-dialog';

const styles = theme => ({
    toolbarButton: {
        color: theme.palette.primary.contrastText,
        textTransform: 'none'
    },
    toolbarIcon: {
        fill: theme.palette.primary.contrastText
    },
    toolbarContent: {
        color: theme.palette.primary.contrastText,
        paddingRight: '5px',
        paddingLeft: '18px',
        display: 'inline-block'
    }
});

@inject('projectStore')
@observer
class ProjectToolbar extends React.Component {
    render() {
        const { classes, projectStore } = this.props;

        return (
            <div >
                <Typography variant="subtitle1" className={classes.toolbarContent}>
                    {projectStore.selectedProject.name}
                </Typography>
                <Tooltip title='Add project content'>
                    <span>
                        <IconButton onClick={this.handleAddContent} disabled={!projectStore.selectedProject.id}>
                            <Icon className={classNames(classes.toolbarIcon, classes.toolbarButton)}><AddContents /></Icon>
                        </IconButton>
                    </span>
                </Tooltip>
                <AddContentDialog />
            </div>
        );
    }

    handleAddContent = () => {
        const { projectStore } = this.props;

        projectStore.setAddContentDialogOpen(true);
    }
}

ProjectToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    projectStore: PropTypes.object
}

export default withStyles(styles)(ProjectToolbar);
