import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import {routes} from "./routes";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
