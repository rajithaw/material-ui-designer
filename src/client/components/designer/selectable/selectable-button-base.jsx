import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
    selectable: {
        border: '1px dotted gray !important'
    },
    selected: {
        border: '2px solid black !important'
    }
};

@inject('designerStore')
@observer
class SelectableButtonBase extends React.Component {
    render() {
        // eslint-disable-next-line
        const { designerStore, classes, style, children, onClick, ...other } = this.props;  // onClick passed in through props should be ignored to avoid conflicting with internal onClick
        const selected = this.props.id === designerStore.selectedComponentId;

        return (
            <ButtonBase
                className={classNames(classes.selectable, { [classes.selected]: selected })}
                style={{ ...style }}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </ButtonBase>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();
        
        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableButtonBase.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    style: PropTypes.any,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableButtonBase);
