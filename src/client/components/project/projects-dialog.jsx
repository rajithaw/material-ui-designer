import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import ProjectList from './project-list';

const styles = theme => ({
    createButton: {
        position: 'absolute',
        right: theme.spacing(8),
        top: theme.spacing(1)
    },
    deleteButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1)
    }
});

@inject('projectStore', 'designerStore')
@observer
class ProjectsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteConfirmationOpen: false,
            createProjectDialogOpen: false,
            unSavedChangesDialogOpen: false,
            projectName: ''
        }
    }

    render() {
        const { classes, projectStore } = this.props;

        return (
            <div>
                <Dialog
                    open={projectStore.projectsDialogOpen}
                    disableBackdropClick
                    fullWidth
                    onClose={this.handleClose}
                >
                    <DialogTitle disableTypography>
                        <Typography variant="h6">Projects</Typography>
                        <Tooltip title='Create project'>
                            <IconButton className={classes.createButton} onClick={this.handleCreate}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete project'>
                            <span className={classes.deleteButton}>
                                <IconButton onClick={this.handleDelete} disabled={!projectStore.currentProject.id}>
                                    <DeleteIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </DialogTitle>
                    <DialogContent>
                        <ProjectList />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleOk} color="primary">
                            Open
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.deleteConfirmationOpen}
                    disableBackdropClick
                    onClose={this.handleDeleteConfirmClose}
                >
                    <DialogTitle>Confirm delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Delete project?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeleteConfirmClose} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleDeleteConfirmOk} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.createProjectDialogOpen}
                    disableBackdropClick
                    onClose={this.handleCreateProjectClose}
                >
                    <DialogTitle>Create project</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Project name"
                            value={this.state.projectName}
                            onChange={this.handleProjectNameChange}
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCreateProjectClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreateProjectOk} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.unSavedChangesDialogOpen}
                    disableBackdropClick
                    maxWidth="xs"
                    onClose={this.handleUnSavedChangesClose}
                >
                    <DialogTitle>Confirm open</DialogTitle>
                    <DialogContent>
                        <DialogContentText>You have unsaved changes in the designer. Do you want to continue without saving?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleUnSavedChangesClose} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleUnSavedChangesOk} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    handleDelete = () => {
        this.setState({
            deleteConfirmationOpen: true
        });
    }

    handleCreate = () => {
        this.setState({
            createProjectDialogOpen: true
        });
    }

    handleClose = () => {
        this.props.projectStore.setProjectsDialogOpen(false);
    };

    handleOk = () => {
        const { projectStore, designerStore } = this.props;

        if (designerStore.isDesignerDirty) {
            this.setState({
                unSavedChangesDialogOpen: true
            });
        }
        else {
            // Retrieve project with content from server
            projectStore.getProject(projectStore.currentProject.id);
        }

        this.handleClose();
    }

    handleUnSavedChangesClose = () => {
        this.setState({
            unSavedChangesDialogOpen: false
        });
    }

    handleUnSavedChangesOk = () => {
        const { projectStore } = this.props;

        // Retrieve project with content from server
        projectStore.getProject(projectStore.currentProject.id);
        this.handleUnSavedChangesClose();
    }

    handleDeleteConfirmClose = () => {
        this.setState({
            deleteConfirmationOpen: false
        });
    }

    handleDeleteConfirmOk = () => {
        const { projectStore } = this.props;

        projectStore.deleteProject(projectStore.currentProject.id);
        projectStore.setCurrentProject({});
        this.handleDeleteConfirmClose();
    }

    handleProjectNameChange = (event) => {
        this.setState({
            projectName: event.target.value
        })
    }

    handleCreateProjectClose = () => {
        this.setState({
            createProjectDialogOpen: false
        });
    }

    handleCreateProjectOk = () => {
        const project = {
            name: this.state.projectName
        };

        this.props.projectStore.createProject(project);
        this.handleCreateProjectClose();
    }
}

ProjectsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    projectStore: PropTypes.object,
    designerStore: PropTypes.object
}

export default withStyles(styles)(ProjectsDialog);
