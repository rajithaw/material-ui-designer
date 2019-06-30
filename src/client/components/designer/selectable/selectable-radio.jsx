import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Radio } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

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
class SelectableRadio extends React.Component {
    render() {
        const { designerStore, classes, icon, checkedIcon, style, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;
        const iconDefinition = icon ? designerStore.createComponentsFromJsxString(icon) : <RadioButtonUncheckedIcon/>;
        const checkedIconDefinition = checkedIcon ? designerStore.createComponentsFromJsxString(checkedIcon) : <RadioButtonCheckedIcon/>;

        return (
            <Radio
                className={classNames(classes.selectable, { [classes.selected]: selected })}
                style={{ ...style }}
                icon={iconDefinition}
                checkedIcon={checkedIconDefinition}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </Radio>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();

        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableRadio.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    icon: PropTypes.string,
    checkedIcon: PropTypes.string,
    style: PropTypes.any,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableRadio);
