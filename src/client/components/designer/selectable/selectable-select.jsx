import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';

const styles = {
    selectable: {
        border: '1px dotted gray'
    },
    selected: {
        border: '2px solid black'
    }
};

@inject('designerStore')
@observer
class SelectableSelect extends React.Component {
    render() {
        // input and renderValue props should not be passed to the component as a string
        // eslint-disable-next-line
        const { designerStore, classes, style, children, input, renderValue, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <Select
                className={classNames(classes.selectable, { [classes.selected]: selected })}
                style={{ ...style }}
                disableUnderline={true}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </Select>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();

        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableSelect);
