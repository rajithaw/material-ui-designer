import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import ImageIcon from '@material-ui/icons/Image';
import TextIcon from '@material-ui/icons/TextFields';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import { ContentType } from '../../enums';

const styles = {
    projectContent: {
        marginLeft: '10px',
        marginRight: '10px'
    }
};

@inject('projectStore')
@observer
class ProjectContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteConfirmationOpen: false,
            deletedContentKey: ''
        }
    }

    render() {
        const { classes, projectStore } = this.props;

        return (
            <div className={classes.projectContent}>
                <List>
                    {
                        Object.keys(projectStore.projectContent).map(c => {
                            return (
                                <ListItem button key={c} onClick={this.handleClick(projectStore.projectContent[c])}>
                                    <ListItemIcon>
                                        <span>
                                            {
                                                projectStore.projectContent[c].type === ContentType.Text &&
                                                <TextIcon />
                                            }
                                            {
                                                projectStore.projectContent[c].type === ContentType.Image &&
                                                <ImageIcon />
                                            }
                                        </span>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {c}
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={this.handleDelete(c)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <Dialog
                    open={this.state.deleteConfirmationOpen}
                    disableBackdropClick
                    onClose={this.handleDeleteConfirmClose}
                >
                    <DialogTitle>Confirm delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Delete content?</DialogContentText>
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
            </div>
        );
    }

    handleClick = (content) => () => {
        const { projectStore } = this.props;

        projectStore.setEditedProjectContent(content);
        projectStore.setAddContentDialogOpen(true, true);
    }

    handleDelete = key => () => {
        this.setState({
            deleteConfirmationOpen: true,
            deletedContentKey: key
        });
    }

    handleDeleteConfirmClose = () => {
        this.setState({
            deleteConfirmationOpen: false,
            deletedContentKey: ''
        });
    }

    handleDeleteConfirmOk = () => {
        const { projectStore } = this.props;

        projectStore.deleteProjectContent(projectStore.selectedProject.id, this.state.deletedContentKey);
        this.handleDeleteConfirmClose();
    }
}

ProjectContent.propTypes = {
    classes: PropTypes.object.isRequired,
    projectStore: PropTypes.object,
    disabled: PropTypes.bool
}

export default withStyles(styles)(ProjectContent);
