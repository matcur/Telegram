import React from 'react';
import './App.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import {routes} from "./routes";
import {AuthenticatedHandler} from "./components/handlers/AuthenticatedHandler";
import {UpLayerProvider} from "./providers/UpLayerProvider";
import {Modals} from "./components/Modals";

const App = () => {
  return (
    <div className="App">
      <Modals>
        <UpLayerProvider>
          <BrowserRouter>
            <AuthenticatedHandler>
              <Switch>
                {routes}
              </Switch>
            </AuthenticatedHandler>
          </BrowserRouter>
        </UpLayerProvider>
      </Modals>
    </div>
  );
}

export default App;
