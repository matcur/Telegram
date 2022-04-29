import React, {useState} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import {routes} from "./routes";
import {AuthenticatedHandler} from "./components/handlers/AuthenticatedHandler";
import {UpLayer} from "./components/UpLayer";
import {LeftMenu} from "./components/menus/left-menu";
import {UpLayerContext} from "./contexts/UpLayerContext";
import {LeftMenuContext} from "./contexts/LeftMenuContext";

const App = () => {
  const [upLayerVisible, setUpLayerVisible] = useState(false)
  const [leftMenuVisible, setLeftMenuVisible] = useState(false)
  const [centralElement, setCentralElement] = useState(() => <div/>)

  const hideUpLayer = () => {
    setLeftMenuVisible(false)
    setUpLayerVisible(false)
    setCentralElement(<div/>)
  }
  
  return (
    <div className="App">
      <UpLayerContext.Provider value={{setVisible: setUpLayerVisible, setCentralElement, hide: hideUpLayer}}>
        <LeftMenuContext.Provider value={{setVisible: setLeftMenuVisible}}>
          <UpLayer
            visible={upLayerVisible}
            leftElement={<LeftMenu visible={leftMenuVisible}/>}
            centerElement={centralElement}
            onClick={hideUpLayer}/>
          <BrowserRouter>
            <AuthenticatedHandler>
              <Switch>
                {routes}
              </Switch>
            </AuthenticatedHandler>
          </BrowserRouter>
        </LeftMenuContext.Provider>
      </UpLayerContext.Provider>
    </div>
  );
}

export default App;
