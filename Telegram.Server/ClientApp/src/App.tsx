import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import {routes} from "./routes";
import {AuthenticatedHandler} from "./components/handlers/AuthenticatedHandler";
import {UpLayerProvider} from "./providers/UpLayerProvider";

const App = () => {
  return (
    <div className="App">
      <UpLayerProvider>
        <BrowserRouter>
          <AuthenticatedHandler>
            <Switch>
              {routes}
            </Switch>
          </AuthenticatedHandler>
        </BrowserRouter>
      </UpLayerProvider>
    </div>
  );
}

export default App;
