import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import {routes} from "./routes";
import {AuthenticatedHandler} from "./components/handlers/AuthenticatedHandler";
import {UpLayerProvider} from "./providers/UpLayerProvider";
import {Modals} from "./components/Modals";
import "styles/index.sass"
import {UserUpdatedHandler} from "./components/handlers/UserUpdatedHandler";

const App = () => {
  return (
    <div className="App">
      <Modals>
        <UpLayerProvider>
          <BrowserRouter>
            <AuthenticatedHandler>
              <UserUpdatedHandler>
                <Switch>
                  {routes}
                </Switch>
              </UserUpdatedHandler>
            </AuthenticatedHandler>
          </BrowserRouter>
        </UpLayerProvider>
      </Modals>
    </div>
  );
}

export default App;
