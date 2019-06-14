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
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PageList from './page-list';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: theme.spacing(8),
        top: theme.spacing(1)
    },
    deleteButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1)
    },
    sharedCheckbox: {
        marginTop: '20px'
    }
});

@inject('pageStore', 'projectStore', 'designerStore')
@observer
class PagesDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteConfirmationOpen: false,
            addPageDialogOpen: false,
            unSavedChangesDialogOpen: false,
            pageName: '',
            isShared: false
        }
    }

    render() {
        const { classes, pageStore } = this.props;

        return (
            <div>
                <Dialog
                    open={pageStore.pagesDialogOpen}
                    disableBackdropClick
                    fullWidth
                    onClose={this.handleClose}
                >
                    <DialogTitle disableTypography>
                        <Typography variant="h6">Pages</Typography>
                        <Tooltip title='Add page'>
                            <IconButton className={classes.addButton} onClick={this.handleAdd}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete page'>
                            <span className={classes.deleteButton}>
                                <IconButton onClick={this.handleDelete} disabled={!pageStore.currentPage.id}>
                                    <DeleteIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </DialogTitle>
                    <DialogContent>
                        <PageList />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleOk} color="primary">
                            OK
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
                        <DialogContentText>Delete page?</DialogContentText>
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
                    open={this.state.addPageDialogOpen}
                    disableBackdropClick
                    onClose={this.handleAddPageClose}
                >
                    <DialogTitle>Add page</DialogTitle>
                    <DialogContent>
                        <FormGroup row>
                            <TextField
                                label="Page name"
                                value={this.state.pageName}
                                onChange={this.handlePageNameChange}
                                margin="normal"
                            />
                            <FormControlLabel
                                className={classes.sharedCheckbox}
                                control={
                                    <Checkbox
                                        checked={this.state.isShared}
                                        onChange={this.handleIsSharedChange}
                                    />
                                }
                                label="Is Shared"
                            />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAddPageClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddPageOk} color="primary">
                            OK
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

    handleAdd = () => {
        this.setState({
            addPageDialogOpen: true
        });
    }

    handleClose = () => {
        this.props.pageStore.setPagesDialogOpen(false);
    };

    handleOk = () => {
        const { pageStore, projectStore, designerStore } = this.props;

        if (designerStore.isDesignerDirty) {
            this.setState({
                unSavedChangesDialogOpen: true
            });
        }
        else {
            pageStore.getPage(projectStore.selectedProject.id, pageStore.currentPage.id);
        }

        this.handleClose();
    }

    handleUnSavedChangesClose = () => {
        this.setState({
            unSavedChangesDialogOpen: false
        });
    }

    handleUnSavedChangesOk = () => {
        const { pageStore, projectStore } = this.props;

        pageStore.getPage(projectStore.selectedProject.id, pageStore.currentPage.id);
        this.handleUnSavedChangesClose();
    }

    handleDeleteConfirmClose = () => {
        this.setState({
            deleteConfirmationOpen: false
        });
    }

    handleDeleteConfirmOk = () => {
        const { pageStore, projectStore } = this.props;

        pageStore.deletePage(projectStore.selectedProject.id, pageStore.currentPage.id);
        pageStore.setCurrentPage({});
        this.handleDeleteConfirmClose();
    }

    handlePageNameChange = (event) => {
        this.setState({
            pageName: event.target.value
        })
    }

    handleIsSharedChange = (event) => {
        this.setState({
            isShared: event.target.checked
        })
    }

    handleAddPageClose = () => {
        this.setState({
            addPageDialogOpen: false
        });
    }

    handleAddPageOk = () => {
        const { pageStore, projectStore } = this.props;
        const page = {
            id: this.state.pageName,
            name: this.state.pageName,
            isShared: this.state.isShared,
        };

        pageStore.addPage(projectStore.selectedProject.id, page);
        this.handleAddPageClose();
    }
}

PagesDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    pageStore: PropTypes.object,
    projectStore: PropTypes.object,
    designerStore: PropTypes.object
}

export default withStyles(styles)(PagesDialog);
