import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from 'mobx-react';
import { Route } from "react-router-dom";

@inject('authStore')
@observer
class PrivateRoute extends React.Component {
    componentDidMount() {
        this.loginWithRedirect();
    }

    componentDidUpdate() {
        this.loginWithRedirect();
    }

    async loginWithRedirect() {
        const { authStore, path } = this.props;
        const { isAuthenticated, loginWithRedirect } = authStore;

        if (!isAuthenticated) {
            await loginWithRedirect({
              redirect_uri: window.location.origin,
              appState: { targetUrl: path }
            });
        }
    }

    render() {
        const { component: Component, path, ...rest } = this.props;
        const render = props => <Component {...props} />;

        return <Route path={path} render={render} {...rest} />
    }
}

PrivateRoute.propTypes = {
    authStore: PropTypes.object,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
};

export default PrivateRoute;
