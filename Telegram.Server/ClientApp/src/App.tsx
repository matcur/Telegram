import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import {routes} from "./routes";
import {AuthenticatedHandler} from "./components/handlers/AuthenticatedHandler";
import {UpLayerProvider} from "./providers/UpLayerProvider";
import {Modals} from "./components/Modals";
import "styles/index.sass"
import {UserUpdatedHandler} from "./components/handlers/UserUpdatedHandler";
import {ThemeProvider} from "./providers/ThemeProvider";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
