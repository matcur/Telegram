import { Route } from 'react-router-dom';
import {Start} from "pages/Start";
import {Login} from "pages/Login";
import {Index} from "pages/Index";
import {NewUserCodeVerification} from "pages/NewUserCodeVerification";
import {TelegramVerification} from "Telegram.Server/ClientApp/src/pages/TelegramVerification";
import React from "react";

export const routes = [
    <Route exact path="/start" component={Start}/>,
    <Route exact path="/login" component={Login}/>,
    <Route exact path="/new-user-code-verification" component={NewUserCodeVerification}/>,
    <Route exact path="/registered-user-code-verification" component={TelegramVerification}/>,
    <Route path="/" component={Index}/>,
]