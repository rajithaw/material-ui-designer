import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CreateProjectDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            projectName: ''
        }
    }

    render() {
        const { okCallback, cancelCallback, open, isCopy } = this.props;

        return (
            <Dialog
                    open={open}
                    disableBackdropClick
                    onClose={cancelCallback}
                >
                    <DialogTitle>
                        { isCopy ? 'Copy Project' : 'Create project' }
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Project name"
                            value={this.state.projectName}
                            onChange={this.handleProjectNameChange}
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={cancelCallback} 
                            color="primary">
                            Cancel
                        </Button>
                        <Button 
                            onClick={() => okCallback({projectName: this.state.projectName})} 
                            color="primary" 
                            disabled={!this.state.projectName}>
                            { isCopy ? 'Copy' : 'Create' }
                        </Button>
                    </DialogActions>
                </Dialog>
        )
    }

    handleProjectNameChange = (event) => {
        this.setState({
            projectName: event.target.value
        })
    }
}

CreateProjectDialog.propTypes = {
    okCallback: PropTypes.func,
    cancelCallback: PropTypes.func,
    open: PropTypes.bool,
    isCopy: PropTypes.bool
}

export default CreateProjectDialog;