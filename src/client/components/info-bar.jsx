import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Snackbar from '@material-ui/core/Snackbar';

@inject('rootStore')
@observer
class InfoBar extends React.Component {
    render() {
        const { rootStore } = this.props;

        return (
            <Snackbar 
                open={rootStore.isInfoBarOpen}
                autoHideDuration={4000}
                onClose={this.handleClose}
                message={rootStore.infoBarMessage}
            />
        );
    }

    handleClose = () => {
        this.props.rootStore.setInfoBarOpen(false);
    };
}

InfoBar.propTypes = {
    rootStore: PropTypes.object
};

export default InfoBar;
