import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';

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
class SelectableDialogContent extends React.Component {
    render() {
        const { designerStore, classes, style, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <DialogContent
                className={classNames(classes.selectable, { [classes.selected]: selected })}
                style={{ ...style }}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </DialogContent>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();
        
        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableDialogContent.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableDialogContent);
