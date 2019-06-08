import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Portal } from '@material-ui/core';

const styles = {
    selectable: {
    },
    selected: {
    }
};

@inject('designerStore')
@observer
class SelectablePortal extends React.Component {
    render() {
        const { designerStore, classes, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <Portal className={classNames(classes.selectable, { [classes.selected]: selected })} {...other}>{children}</Portal>
        );
    }
}

SelectablePortal.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    children: PropTypes.any
}

export default withStyles(styles)(SelectablePortal);
