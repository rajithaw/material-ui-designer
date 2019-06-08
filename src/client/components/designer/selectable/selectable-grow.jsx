import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Grow } from '@material-ui/core';

const styles = {
    selectable: {
        border: '1px dotted gray',
    },
    selected: {
        border: '2px solid black'
    }
};

@inject('designerStore')
@observer
class SelectableGrow extends React.Component {
    render() {
        const { designerStore, classes, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <Grow className={classNames(classes.selectable, { [classes.selected]: selected })} {...other} onClick={this.handleClick}>{children}</Grow>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();

        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableGrow.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableGrow);
