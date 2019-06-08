import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const styles = {
    selectable: {
    },
    selected: {
    }
};

@inject('designerStore')
@observer
class SelectableFade extends React.Component {
    render() {
        const { designerStore, classes, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <span className={classNames(classes.selectable, {[classes.selected]: selected})} onClick={this.handleClick}>
                <Fade {...other}></Fade>
            </span>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();
        
        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableFade.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string
}

export default withStyles(styles)(SelectableFade);
