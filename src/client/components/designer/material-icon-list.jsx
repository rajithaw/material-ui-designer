import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Icon } from '@material-ui/core';
import jsonQ from 'jsonq';

import { ComponentPosition } from '../../enums';

const styles = {
    icon: {
        fill: 'rgba(0, 0, 0, 0.54)'
    }
};

@inject('componentStore', 'designerStore')
@observer
class MaterialIconList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null,
            anchorEl: null
        }
    }
    
    render() {
        const { classes, componentStore, designerStore, disabled } = this.props;
        const { anchorEl } = this.state;

        return (
            <div>
                <List>
                    {
                        componentStore.filteredMaterialIcons.map((component, index) =>
                            <ListItem 
                                button 
                                key={index} 
                                onClick={this.handleListItemClick(component)} 
                                disabled={disabled}
                            >
                                <ListItemIcon>
                                    <Icon className={classes.icon}>{component.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText>
                                    {component.displayName}
                                </ListItemText>
                            </ListItem>
                        )
                    }
                </List>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem
                        onClick={this.handleMenuItemClick(ComponentPosition.Child)}
                        disabled={designerStore.isSharedComponentSelected}
                    >
                        Add Child
                    </MenuItem>
                    <MenuItem
                        onClick={this.handleMenuItemClick(ComponentPosition.Before)}
                    >
                        Insert Before
                    </MenuItem>
                    <MenuItem
                        onClick={this.handleMenuItemClick(ComponentPosition.After)}
                    >
                        Insert After
                    </MenuItem>
                </Menu>
          </div>
        );
    }

    handleListItemClick = component => event => {
        this.setState({ 
            component: component,
            anchorEl: event.currentTarget 
        });
    };

    handleMenuItemClick = (position) => () => {
        const { designerStore } = this.props;
        const childDefinition = this.createChildComponentDefinition();

        designerStore.addComponentDefinition(designerStore.selectedComponentId, childDefinition, position);
        this.clearState();
    };

    handleMenuClose = () => {
        this.clearState();
    };

    createChildComponentDefinition = () => {
        const { designerStore } = this.props;
        const result = jsonQ.clone(this.state.component.designerDefinition);
        
        result.props.id = designerStore.generateUniqueId('component_id');
        result.props.key = designerStore.generateUniqueId('component_key');

        return result;
    }

    clearState = () => {
        this.setState({ 
            component: null,
            anchorEl: null 
        });
    }
}

MaterialIconList.propTypes = {
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    designerStore: PropTypes.object,
    componentStore: PropTypes.object
}

export default withStyles(styles)(MaterialIconList);
