import React from 'react'
import { render } from 'react-dom'
import { observer, Provider } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import * as pages from './components/pages/index';
import SessionStore from "./stores/session.store";

export const stores = new SessionStore();

@observer
class Root extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <React.Fragment>
                    <BrowserRouter>
                        <Switch>
                            {
                                Object.values(pages).map((page, index) => 
                                    <Route 
                                        key={index} 
                                        path={'/' + (page.default.wrappedComponent ? page.default.wrappedComponent.name : page.default.name)} component={page.default} 
                                    />
                                )
                            }
                        </Switch>
                    </BrowserRouter>
                </React.Fragment>
            </Provider>
        )
    }
}

render(<Root />, document.getElementById('root'));
