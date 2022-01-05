import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import {routes} from "./routes";
import {AuthenticatedHandler} from "./components/handlers/AuthenticatedHandler";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthenticatedHandler>
          <Switch>
            {routes}
          </Switch>
        </AuthenticatedHandler>
      </BrowserRouter>
    </div>
  );
}

export default App;
