import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import DesignerTheme from "./designer-theme";
import { designerComponentMap } from '../../constants/designer-component-map';
import SelectableSpan from './selectable/selectable-span';
import DesignerFrame from "./designer-frame";

@inject('designerStore', 'componentStore')
@observer
class Designer extends React.Component {

    componentDidCatch(error) {
        // eslint-disable-next-line
        console.log(error);
    }

    render() {
        const { designerStore } = this.props;
        const children = designerStore.componentDefinition.component ? 
            this.createComponents(designerStore.componentDefinition) : null;

        return (
            <DesignerFrame>
                <DesignerTheme>
                    <div id="frame-children-root">{children}</div>
                </DesignerTheme>
            </DesignerFrame>
        );
    }

    createComponents = (def) => {
        return React.createElement(
            designerComponentMap[def.component] || SelectableSpan, 
            def.props,
            def.props && def.props.children && this.createChildren(def.component, def.props.children)
        );
    };

    createChildren = (componentName, children) => {
        const { componentStore } = this.props;
        const childrenMetaData = componentStore.getPropertyMetaData(componentName, 'children');
        let result = null;

        if((typeof children) === 'string') {
            result = children;
        }
        else {
            if (childrenMetaData) {
                if (children && children.length > 0) {
                    if (childrenMetaData.single) {
                        result = this.createComponents(children[0]);
                    }
                    else {
                        const childComponents = children.map(c => this.createComponents(c));
                        result = childComponents.length > 1 ? childComponents : childComponents[0];
                    }
                }
                else {
                    if (childrenMetaData.required) {
                        result = React.createElement(SelectableSpan);
                    }
                }
            }
            else {
                if (children) {
                    const childComponents = children.map(c => this.createComponents(c));
                    result = childComponents.length > 1 ? childComponents : childComponents[0];
                }
            }
        }

        return result;
    };
}

Designer.propTypes = {
    designerStore: PropTypes.object,
    componentStore: PropTypes.object
}

export default Designer;
