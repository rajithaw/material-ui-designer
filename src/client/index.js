import React from 'react';
import ReactDOM from 'react-dom';
import { observer, Provider } from "mobx-react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import AuthProvider from '../client/components/authentication/auth-provider';
import AppMain from "./components/app-main";
import SessionStore from "./stores/session.store";
import LoadingSpinner from './components/loading-spinner';
import InfoBar from './components/info-bar';

const theme = createMuiTheme();
const stores = new SessionStore();

@observer
class Root extends React.Component {
    render() {
        const appMain = props => {
            return <AppMain {...props} />;
        };
        return (
            <Provider {...stores}>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                        <React.Fragment>
                            <BrowserRouter>
                                <Switch>
                                    <Route exact path="/" component={appMain} />
                                </Switch>
                            </BrowserRouter>
                            <LoadingSpinner />
                            <InfoBar />
                        </React.Fragment>
                    </ThemeProvider>
                </AuthProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));