import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';


const styles = {
    selectable: {
        border: '1px dotted gray',
        color: 'black !important',
        backgroundColor: 'white !important'
    },
    selected: {
        border: '2px solid black'
    }
};

@inject('designerStore')
@observer
class SelectableTableBody extends React.Component {
    render() {
        const { designerStore, classes, style, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <TableBody
                className={classNames(classes.selectable, { [classes.selected]: selected })}
                style={{ ...style }}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </TableBody>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();
        
        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableTableBody.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableTableBody);
