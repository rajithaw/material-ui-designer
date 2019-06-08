import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';

const styles = {
    selectable: {
        border: '1px dotted gray',
        '& div' : {
            width: '32px',
            height: '32px',
            opacity: 1
        }
    },
    selected: {
        border: '2px solid black'
    }
}

@inject('designerStore')
@observer
class SelectableBackdrop extends React.Component {
    render() {
        const { designerStore, classes, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <span className={classNames(classes.selectable, { [classes.selected]: selected })} onClick={this.handleClick}>
                <Backdrop {...other} style={{opacity: 1}}>{children}</Backdrop>
            </span>
        )
    }

    handleClick = (event) => {
        event.stopPropagation();

        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableBackdrop.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableBackdrop)