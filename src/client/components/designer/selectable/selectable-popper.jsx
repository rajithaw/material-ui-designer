import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Popper } from '@material-ui/core';

const styles = {
    selectable: {
        border: '1px dotted gray !important'
    },
    selected: {
        border: '2px solid black !important'
    }
};

@inject('designerStore')
@observer
class SelectablePopper extends React.Component {
    render() {
        const { designerStore, classes, style, children, open, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <Popper
                className={classNames(classes.selectable, { [classes.selected]: selected })}
                style={{ ...style }}
                disablePortal={true}
                keepMounted={true}
                open={!!open}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </Popper>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();

        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectablePopper.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    open: PropTypes.bool,
    children: PropTypes.any
}

export default withStyles(styles)(SelectablePopper);
