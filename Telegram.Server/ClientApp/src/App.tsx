import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import {Start} from "pages/Start";
import {Login} from "pages/Login";
import {Index} from "pages/Index";
import {NewUserCodeVerification} from "pages/NewUserCodeVerification";
import {RegisteredUserCodeVerification} from "pages/RegisteredUserCodeVerification";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/start" component={Start}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/new-user-code-verification" component={NewUserCodeVerification}/>
          <Route exact path="/registered-user-code-verification" component={RegisteredUserCodeVerification}/>
          <Route exact path="/" component={Index}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
