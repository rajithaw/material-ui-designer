import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import SharedIcon from '@material-ui/icons/Share'
import jsonQ from 'jsonq';

import { ComponentPosition } from '../../enums';
import componentService from '../../services/component-service';

@inject('componentStore', 'designerStore')
@observer
class SharedComponentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sharedComponent: null,
            anchorEl: null
        }

        props.componentStore.getSharedComponents();
    }
    
    render() {
        const { componentStore, designerStore, disabled } = this.props;
        const { anchorEl } = this.state;

        return (
            <div>
                <List>
                    {
                        componentStore.filteredSharedComponents.map((component, index) =>
                            <ListItem 
                                button 
                                key={index} 
                                onClick={this.handleListItemClick(component)} 
                                disabled={disabled}
                            >
                                <ListItemIcon>
                                    <SharedIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    {component.name}
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
            sharedComponent: component,
            anchorEl: event.currentTarget 
        });
    };

    handleMenuItemClick = (position) => () => {
        const { sharedComponent } = this.state;

        componentService.getSharedComponent(sharedComponent.id)
        .then((component) => {
            const { designerStore } = this.props;
            const componentQuery = jsonQ(component.definition);

            designerStore.resetComponentIds(componentQuery);
            const childDefinition = componentQuery.firstElm();

            // If shered component is added by reference, store the id of the shared component.
            // This id will be used to identify that the component is added by reference.
            if(!designerStore.addSharedComponentCopy) {
                childDefinition.sharedComponentId = sharedComponent.id;
            }

            designerStore.addComponentDefinition(designerStore.selectedComponentId, childDefinition, position);
            this.clearState();
        });
    };

    handleMenuClose = () => {
        this.clearState();
    };

    clearState = () => {
        this.setState({ 
            sharedComponent: null,
            anchorEl: null 
        });
    }
}

SharedComponentList.propTypes = {
    designerStore: PropTypes.object,
    componentStore: PropTypes.object,
    disabled: PropTypes.bool
}

export default SharedComponentList;
