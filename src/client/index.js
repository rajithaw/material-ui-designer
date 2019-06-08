import "./installStyles";
import React from 'react';
import ReactDOM from 'react-dom';
import { observer, Provider } from "mobx-react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppMain from "./components/app-main";
import SessionStore from "./stores/session.store";
import LoadingSpinner from './components/loading-spinner';
import InfoBar from './components/info-bar';

export const stores = new SessionStore();

@observer
class Root extends React.Component {
    render() {
        const appMain = props => {
            return <AppMain {...props} />;
        };
        return (
            <Provider {...stores}>
                <React.Fragment>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={appMain} />
                        </Switch>
                    </BrowserRouter>
                    <LoadingSpinner />
                    <InfoBar />
                </React.Fragment>
            </Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));