import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core';

const styles = {
    selectable: {
        '&>div:last-of-type': {
            border: '1px dotted gray !important'
        }
    },
    selected: {
        '&>div:last-of-type': {
            border: '2px solid black !important'
        }
    }
};

@inject('designerStore')
@observer
class SelectablePopover extends React.Component {
    render() {
        const { designerStore, classes, style, children, open, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <Popover
                className={classNames(classes.selectable, { [classes.selected]: selected })}
                style={{ ...style }}
                disablePortal={true}
                keepMounted={true}
                open={!!open}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </Popover>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();

        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectablePopover.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    open: PropTypes.bool,
    children: PropTypes.any
}

export default withStyles(styles)(SelectablePopover);
