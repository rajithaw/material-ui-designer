import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

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
class SelectableCheckbox extends React.Component {
    render() {
        const { designerStore, classes, icon, checkedIcon, indeterminateIcon, style, children, ...other } = this.props;
        const selected = this.props.id === designerStore.selectedComponentId;
        const iconDefinition = icon ? designerStore.createComponentsFromJsxString(icon) : <CheckBoxIcon />;
        const checkedIconDefinition = checkedIcon ? designerStore.createComponentsFromJsxString(checkedIcon) : <CheckBoxOutlineBlankIcon/>;
        const indeterminateIconDefinition = indeterminateIcon ? designerStore.createComponentsFromJsxString(indeterminateIcon) : <IndeterminateCheckBoxIcon/>;

        return (
            <Checkbox
                className={classNames(classes.selectable, {[classes.selected]: selected })}
                style={{ ...style }}
                icon={iconDefinition}
                checkedIcon={checkedIconDefinition}
                indeterminateIcon={indeterminateIconDefinition}
                {...other}
                onClick={this.handleClick}
            >
                {children}
            </Checkbox>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();
        
        const { designerStore, id } = this.props;
        designerStore.selectComponent(id);
    }
}

SelectableCheckbox.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    id: PropTypes.string,
    icon: PropTypes.string,
    checkedIcon: PropTypes.string,
    indeterminateIcon: PropTypes.string,
    style: PropTypes.any,
    children: PropTypes.any
}

export default withStyles(styles)(SelectableCheckbox);
