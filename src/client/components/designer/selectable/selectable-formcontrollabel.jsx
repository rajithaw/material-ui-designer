import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
class SelectableFormControlLabel extends React.Component {
    render() {
        const { designerStore, classes, style, control, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <FormControlLabel
                className={classNames(classes.selectable, {[classes.selected]: selected })}
                style={{ ...style }}
                control={control || 'Radio'}
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

SelectableFormControlLabel.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    control: PropTypes.any
}

export default withStyles(styles)(SelectableFormControlLabel);
