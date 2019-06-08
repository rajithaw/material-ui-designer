import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';

const styles = {
    searchField: {
        marginLeft: '10px',
        marginRight: '10px'
    },
    clearIcon: {
        cursor: 'pointer',
    }
};


@inject('componentStore')
@observer
class ComponentSerach extends React.Component {
    render() {
        const { classes, componentStore } = this.props;

        return (
            <div className={classes.searchField}>
                <TextField
                    placeholder="Search components"
                    margin="normal"
                    value={componentStore.componentSearchQuery}
                    fullWidth={true}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon><Search/></Icon>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {
                                    componentStore.componentSearchQuery &&
                                    <Icon className={classes.clearIcon}><Clear onClick={this.handleClearSearch} /></Icon>
                                }
                            </InputAdornment>
                        )
                    }}
                    onChange={this.handleSearchChange}
                />
            </div>
        );
    }

    handleSearchChange = (event) => {
        const { componentStore } = this.props;

        componentStore.setComponentSearchQuery(event.target.value);
    }

    handleClearSearch = () => {
        const { componentStore } = this.props;

        componentStore.setComponentSearchQuery('');
    }
}

ComponentSerach.propTypes = {
    classes: PropTypes.object.isRequired,
    componentStore: PropTypes.object
};

export default withStyles(styles)(ComponentSerach);
