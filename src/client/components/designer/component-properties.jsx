import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
    componentProperties: {
        marginLeft: '10px',
        marginRight: '10px'
    }
};

@inject('designerStore', 'componentStore')
@observer
class ComponentProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, designerStore, componentStore, disabled } = this.props;
        const selectedComponentDefinitioin = designerStore.getComponentDefinition(designerStore.selectedComponentId);
        const component = selectedComponentDefinitioin && componentStore.findByName(selectedComponentDefinitioin.component);
        const availableProps = component && component.properties;

        return (
            <div className={classes.componentProperties}>
                {
                    availableProps &&
                    availableProps.map(p => {
                        return <TextField
                            key={p}
                            label={p}
                            value={this.state[p] == null ? designerStore.getComponentProperty(selectedComponentDefinitioin, p) || '' : this.state[p]}
                            disabled={disabled || p === 'id'}
                            margin="normal"
                            fullWidth={true}
                            onChange={this.handleChange(p)}
                            onBlur={this.handleBlur(p)}
                        />
                    })
                }
            </div>
        );
    }

    handleChange = key => event => {
        this.setState({
            [key]: event.target.value,
        });
    }

    handleBlur = key => event => {
        const { designerStore } = this.props;

        designerStore.setComponentProperty(designerStore.selectedComponentId, key, event.target.value);
        this.setState({
            [key]: null,
        });        
    }
}

ComponentProperties.propTypes = {
    classes: PropTypes.object.isRequired,
    designerStore: PropTypes.object,
    componentStore: PropTypes.object, 
    disabled: PropTypes.bool
}

export default withStyles(styles)(ComponentProperties);
