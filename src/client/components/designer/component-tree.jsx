import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Icon from '@material-ui/core/Icon';
import ToggleIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { Treebeard, decorators } from 'react-treebeard';
import treeTheme from 'react-treebeard/dist/themes/default';

treeTheme.tree.base.backgroundColor = 'white';
treeTheme.tree.base.color = 'black';
treeTheme.tree.base.fontFamily = "Roboto, Helvetica, Arial, sans-serif";
treeTheme.tree.node.activeLink.background = 'lightgrey';
treeTheme.tree.node.toggle.arrow.fill = 'black';
treeTheme.tree.node.header.base.color = 'black';

decorators.Toggle = function Toggle() {
    return (
        <span>
            <Icon color="primary">
                <ToggleIcon/>
            </Icon>
        </span>
    );
};

@inject('designerStore')
@observer
class ComponentTree extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }

    render() {
        const { designerStore } = this.props;
        const treeData = this.transformComponentDefinition(designerStore.componentDefinition);

        return (
            <Treebeard
                data={treeData}
                style={treeTheme}
                onToggle={this.onToggle}
            />
        );
    }

    onToggle(node) {
        const { designerStore } = this.props;

        designerStore.selectComponent(node.id);
    }

    transformComponentDefinition = (def) => {
        if(!def.component) {
            return def;
        }

        return {
            name: def.component + (def.props.name ? (' - ' + def.props.name) : ''),
            id: def.props.id,
            active: def.props.id === this.props.designerStore.selectedComponentId,
            toggled: true,
            children: (() => {
                const children = def.children || [];
                if(Array.isArray(children)) {
                    return children.map(c => this.transformComponentDefinition(c));
                }
                else {
                    return [];
                }
            })()
        }
    }
}

ComponentTree.propTypes = {
    designerStore: PropTypes.object
}

export default ComponentTree;
