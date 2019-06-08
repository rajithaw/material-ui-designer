import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import jsonQ from 'jsonq';

import { ComponentPosition } from '../../enums';

@inject('componentStore', 'designerStore')
@observer
class MaterialComponentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null,
            anchorEl: null
        }
    }
    
    render() {
        const { componentStore, designerStore, disabled } = this.props;
        const { anchorEl } = this.state;

        return (
            <div>
                <List>
                    {
                        componentStore.filteredMaterialComponents.map((component, index) =>
                            <ListItem 
                                button 
                                key={index} 
                                onClick={this.handleListItemClick(component)} 
                                disabled={disabled}
                            >
                                <ListItemIcon>
                                    {component.icon}
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

MaterialComponentList.propTypes = {
    designerStore: PropTypes.object,
    componentStore: PropTypes.object,
    disabled: PropTypes.bool
}

export default MaterialComponentList;
