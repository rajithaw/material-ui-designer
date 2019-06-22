import { observable, action } from 'mobx';
import createAuth0Client from '@auth0/auth0-spa-js';
import authConfig from '../../../auth.config.json';

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

export default class AuthStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }
    
    auth0Client = null;
    @observable isAuthenticated = false;
    @observable user = null;
    @observable loading = false;
    @observable popupOpen = false;

    @action
    async initAuth(config) {
        const onRedirectCallback = (config && config.onRedirectCallback) || DEFAULT_REDIRECT_CALLBACK;
        this.auth0Client = await createAuth0Client({
            domain: authConfig.domain, 
            client_id: authConfig.clientId,
            audience: authConfig.audience
        });

        if (window.location.search.includes("code=")) {
            const { appState } = await this.auth0Client.handleRedirectCallback();
            onRedirectCallback(appState);
        }

        this.isAuthenticated = await this.auth0Client.isAuthenticated();

        if (this.isAuthenticated) {
            this.user = await this.auth0Client.getUser();
        }

        this.loading = false;
    }

    @action
    async loginWithPopup(params = {}) {
        this.popupOpen = true;
        try {
            await this.auth0Client.loginWithPopup(params);
        } catch (error) {
            // eslint-disable-next-line
            console.error(error);
        } finally {
            this.popupOpen = false;
        }
        this.user = await this.auth0Client.getUser();
        this.isAuthenticated = true;
    }

    handleRedirectCallback = async () => {
        this.loading = true;
        await this.auth0Client.handleRedirectCallback();
        const user = await this.auth0Client.getUser();
        this.loading = false;
        this.isAuthenticated = true;
        this.user = user;
    };

    getIdTokenClaims = (...p) => this.auth0Client.getIdTokenClaims(...p);
    loginWithRedirect = (...p) => this.auth0Client.loginWithRedirect(...p);
    getTokenSilently = (...p) => this.auth0Client.getTokenSilently(...p);
    getTokenWithPopup = (...p) => this.auth0Client.getTokenWithPopup(...p);
    logout = (...p) => this.auth0Client.logout(...p);
}
