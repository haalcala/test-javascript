import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterView from "./modules/user/RegisterView";
import LoginView from "./modules/user/LoginView";
import AccountView from "./modules/accounts/AccountsView";


export class Routes extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginView} />
                    <Route path="/register" component={RegisterView} />
                    <Route path="/account" component={AccountView} />
                </Switch>
            </BrowserRouter>
        )
    }
}