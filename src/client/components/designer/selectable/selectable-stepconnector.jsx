import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { StepConnector } from '@material-ui/core';

const styles = {
    selectable: {
        border: '1px dotted gray !important',
    },
    selected: {
        border: '2px solid black !important'
    }
};

@inject('designerStore')
@observer
class SelectableStepConnector extends React.Component {
    render() {
        const { designerStore, classes, style, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <StepConnector className={classNames(classes.selectable, { [classes.selected]: selected })}
                {...other}
                style={{ ...style }}
                onClick={this.handleClick}
            >
                {children}
            </StepConnector>
        );
    }
    handleClick = (event) => {
        event.stopPropagation();

        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableStepConnector.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableStepConnector);
