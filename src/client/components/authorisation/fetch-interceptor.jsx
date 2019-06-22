import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import fetchIntercept from 'fetch-intercept';

@inject('authStore')
@observer
class FetchInterceptor extends React.Component {
    constructor(props) {
        super(props);

        fetchIntercept.register({
            request: async function (url, config) {
                // Modify the url or config here
                const { authStore } = props;

                if(authStore.isAuthenticated) {
                    const accessToken = await authStore.getTokenSilently();
                    const configWithAuth = config || {};
                    const authHeader = {
                        'Authorization': `Bearer ${accessToken}`
                    };

                    configWithAuth.headers = configWithAuth.headers ? {...configWithAuth.headers, ...authHeader} : authHeader;
                    config = configWithAuth;
                }

                return [url, config];
            },
        
            requestError: function (error) {
                // Called when an error occured during another 'request' interceptor call
                return Promise.reject(error);
            },
        
            response: function (response) {
                // Modify the reponse object
                return response;
            },
        
            responseError: function (error) {
                // Handle an fetch error
                return Promise.reject(error);
            }
        });
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

FetchInterceptor.propTypes = {
    children: PropTypes.any,
    authStore: PropTypes.object
};

export default FetchInterceptor;
