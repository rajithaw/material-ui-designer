import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { KeyCodes } from '../../enums';
import { componentMap } from '../../constants/component-map';

const styles = {
    previewFrame: {
        flexGrow: 1,
        overflowY: 'auto',
        height: '100%'
    }
};

@inject('rootStore', 'designerStore', 'componentStore')
@observer
class Preview extends React.Component {

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscapeKey);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscapeKey);
    }

    componentDidCatch(error) {
        // eslint-disable-next-line
        console.log(error);
    }

    handleEscapeKey = (event) => {
        const { rootStore } = this.props;

        if(event.keyCode === KeyCodes.Escape) {
            rootStore.resetPreviewMode();
        }
    }

    render() {
        const { classes, designerStore } = this.props;
        const children = designerStore.componentDefinition.component ?
            this.createComponents(designerStore.componentDefinition) : null;

        return (
            <div className={classes.previewFrame}>
                {children}
            </div>
        );
    }

    createComponents = (def) => {
        const { designerStore } = this.props;
        const previewProps = designerStore.getPropertiesForPreview(def.props);

        return React.createElement(
            componentMap[def.component] || def.component, 
            previewProps,
            def.props && def.props.children && this.createChildren(def.component, previewProps.children)
        );
    };

    createChildren = (componentName, children) => {
        const { componentStore } = this.props;
        const component = componentStore.findByName(componentName);
        const childrenMetaData = component && component.propertyMetaData && component.propertyMetaData.children;
        let result = null;

        if ((typeof children) === 'string') {
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
                        result = React.createElement('span');
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

Preview.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object,
    designerStore: PropTypes.object,
    componentStore: PropTypes.object
}

export default withStyles(styles)(Preview);