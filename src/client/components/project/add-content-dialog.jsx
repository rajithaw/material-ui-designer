import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    uploadButton: {
        textTransform: 'none',
        width: '150px'
    },
    fileName: {
        display: 'inline-block',
        marginLeft: '10px'
    },
    uploadHelperText: {
        color: theme.palette.error.main,
        marginTop: '5px'
    }
});

const imageTypes = ['png', 'jpg', 'gif', 'svg'];

@withStyles(styles)
@inject('projectStore')
@observer
class AddContentDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: 0,
            content: '',
            selectedFileName: '',
            uploadHelperText: ''
        };
        this.fileInputRef = null;
    }

    render() {
        const { classes, projectStore } = this.props;
        const isEditMode = projectStore.contentDialogEditMode;

        return (
            <Dialog
                open={projectStore.addContentDialogOpen}
                disableBackdropClick
                fullWidth
                onClose={this.handleClose}
            >
                <DialogTitle>
                    { isEditMode ? 'Edit project content' : 'Add project content' }
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Name"
                                value={isEditMode ? projectStore.editedProjectContent.name : this.state.name}
                                margin="normal"
                                fullWidth
                                disabled={isEditMode}
                                onChange={this.handleContentNameChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl
                                fullWidth
                                margin="normal">
                                <InputLabel htmlFor="typeLabel">Type</InputLabel>
                                <Select
                                    value={isEditMode ? projectStore.editedProjectContent.type : this.state.type}
                                    onChange={this.handleTypeChange}
                                    inputProps={{
                                        name: 'type',
                                        id: 'typeLabel'
                                    }}
                                >
                                    <MenuItem value={0}>Text</MenuItem>
                                    <MenuItem value={1}>Image</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        {
                            (isEditMode ? projectStore.editedProjectContent.type === 0 : this.state.type === 0) &&
                            <TextField
                                //multiline
                                label="Content"
                                value={isEditMode ? projectStore.editedProjectContent.content : this.state.content}
                                margin="normal"
                                fullWidth={true}
                                //rows="5"
                                onChange={this.handleContentValueChange}
                            />
                        }
                        {
                            (isEditMode ? projectStore.editedProjectContent.type === 1 : this.state.type === 1) &&
                            <div>
                                <input
                                    hidden
                                    id="uploadButton"
                                    type="file"
                                    accept={imageTypes.map((t) => '.' + t).join(', ')}
                                    name="uploadImage"
                                    ref={this.setFileInputRef}
                                    onChange={this.handleUploadImageChange}
                                />
                                <label htmlFor="uploadButton">
                                    <Button
                                        className={classes.uploadButton}
                                        component="span"
                                        color="primary"
                                        variant="contained"
                                    >
                                        Upload image
                                    </Button>
                                </label>
                                <Typography className={classes.fileName}>
                                    { this.state.selectedFileName }
                                </Typography>
                                <Typography variant="body2" className={classes.uploadHelperText}>
                                    {this.state.uploadHelperText}
                                </Typography>
                            </div>
                        }
                    </Grid>
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
        );
    }

    handleClose = () => {
        const { projectStore } = this.props;

        projectStore.setAddContentDialogOpen(false);
        this.setState({
            name: '',
            type: 0,
            content: '',
        });
    };

    handleOk = () => {
        const { projectStore } = this.props;

        if (projectStore.contentDialogEditMode) {
            const content = {
                name: projectStore.editedProjectContent.name,
                type: projectStore.editedProjectContent.type,
                content: projectStore.editedProjectContent.content
            };

            projectStore.updateProjectContent(projectStore.selectedProject.id, content);
        }
        else {
            const content = {
                name: this.state.name,
                type: this.state.type,
                content: this.state.content
            };

            projectStore.addProjectContent(projectStore.selectedProject.id, content);
        }
        
        this.handleClose();
    }

    handleContentNameChange = (event) => {
        const { projectStore } = this.props;

        if (projectStore.contentDialogEditMode) {
            const content = projectStore.editedProjectContent;

            content.name = event.target.value;
            projectStore.setEditedProjectContent(content);
        }
        else {
            this.setState({
                name: event.target.value
            });
        }
    }

    handleContentValueChange = (event) => {
        const { projectStore } = this.props;

        if (projectStore.contentDialogEditMode) {
            const content = projectStore.editedProjectContent;

            content.content = event.target.value;
            projectStore.setEditedProjectContent(content);
        }
        else {
            this.setState({
                content: event.target.value
            });
        }
    }

    handleTypeChange = (event) => {
        const { projectStore } = this.props;

        if (projectStore.contentDialogEditMode) {
            const content = projectStore.editedProjectContent;

            content.type = event.target.value;
            content.content = '';
            projectStore.setEditedProjectContent(content);
        }
        else {
            this.setState({
                type: event.target.value,
                content: ''
            });
        }
    }

    setFileInputRef = element => {
        this.fileInputRef = element;
    }

    handleUploadImageChange = () => {
        const files = this.fileInputRef.files;

        if (files && files.length > 0) {
            const file = files[0];
            const fileExt = file.name.split('.').pop().toLowerCase();

            if (imageTypes.indexOf(fileExt) < 0) {
                this.setState({
                    uploadHelperText:'Unsupported file type'
                });
            }
            else if (file.size > 524288) {  // 500KB limit
                this.setState({
                    uploadHelperText: 'Files must not exceed 500 KB'
                });
            }
            else {
                this.setState({
                    selectedFileName: file.name,
                    uploadHelperText: ''
                });

                // Convert upload image to base64
                this.encodeImageFileAsUrl(file);
            }

            // clear the file input
            this.fileInputRef.value = '';
        }
    }

    encodeImageFileAsUrl = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const { projectStore } = this.props;

            if (projectStore.contentDialogEditMode) {
                const content = projectStore.editedProjectContent;

                content.content = reader.result;
                projectStore.setEditedProjectContent(content);
            }
            else {
                this.setState({
                    content: reader.result
                });
            }
        };
        reader.readAsDataURL(file);
    }
}

AddContentDialog.propTypes = {
    classes: PropTypes.object,
    projectStore: PropTypes.object
}

export default AddContentDialog;
