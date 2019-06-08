import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

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
class SelectableDivider extends React.Component {
    render() {
        const { designerStore, classes, style, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <Divider
                className={classNames(classes.selectable, {[classes.selected]: selected })}
                style={{ ...style }}
                {...other}
                onClick={this.handleClick}
            />
        );
    }

    handleClick = (event) => {
        event.stopPropagation();
        
        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableDivider.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any
}

export default withStyles(styles)(SelectableDivider);
