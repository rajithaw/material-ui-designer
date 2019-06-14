import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Info from '@material-ui/icons/Info';

const styles = theme => ({
    componentProperties: {
        marginLeft: '10px',
        marginRight: '10px'
    },
    infoIcon: {
        color: theme.palette.primary.main,
    }
});

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
                        const propValue = this.state[p] == null ? designerStore.getComponentProperty(selectedComponentDefinitioin, p) || '' : this.state[p];
                        // Get the info to be displayed as a tooltip
                        const propInfo = this.getPropertyInfo(p, propValue);

                        return <TextField
                            key={p}
                            label={p}
                            value={propValue}
                            disabled={disabled || p === 'id'}
                            margin="normal"
                            fullWidth={true}
                            InputProps={{
                                endAdornment: (
                                    propInfo ?
                                        <InputAdornment position="end">
                                            <Tooltip title={propInfo}>
                                                <Info className={classes.infoIcon}/>
                                            </Tooltip>
                                        </InputAdornment> : null
                                )
                            }}
                            onChange={this.handleChange(p)}
                            onBlur={this.handleBlur(p)}
                        />
                    })
                }
            </div>
        );
    }

    getPropertyInfo(property, propertyValue) {
        const { designerStore } = this.props;
        let result = '';

        if (property && property.startsWith('on')) {
            if (propertyValue && propertyValue.indexOf('#') > 0) {
                const action = propertyValue.split('#');
                const name = action[0].trim().toLowerCase();
                const id = action[1].trim();

                if (name === 'show' || name === 'hide') {
                    // For show and hide events show the name of the component being shown/hidden as additional info
                    const linkedComp = designerStore.getComponentDefinition(id);
                    if (linkedComp && linkedComp.props) {
                        result = linkedComp.props.name;
                    }
                }
            }
        }

        return result;
    }

    handleChange = key => event => {
        this.setState({
            [key]: event.target.value
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
