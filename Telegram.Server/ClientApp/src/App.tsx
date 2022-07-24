import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import {routes} from "./routes";
import {AuthenticatedHandler} from "./components/handlers/AuthenticatedHandler";
import {UpLayerProvider} from "./providers/UpLayerProvider";
import {Modals} from "./components/Modals";
import "styles/index.sass"

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
