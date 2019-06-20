import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject('authStore')
@observer
class AuthProvider extends React.Component {
    componentDidMount() {
        this.props.authStore.initAuth();
    }

    componentDidUpdate() {
        this.props.authStore.initAuth();
    }

    render() {
        const { children } = this.props;

        return (
            <React.Fragment>
                { children }
            </React.Fragment>
        );
    }
}

AuthProvider.propTypes = {
    children: PropTypes.any,
    authStore: PropTypes.object
};

export default AuthProvider;
