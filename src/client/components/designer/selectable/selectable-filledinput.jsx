import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';

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
class SelectableFilledInput extends React.Component {
    render() {
        const { designerStore, classes, style, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <FilledInput
                className={classNames(classes.selectable, { [classes.selected]: selected })}
                style={{ ...style }}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </FilledInput>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();
        
        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableFilledInput.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableFilledInput);
