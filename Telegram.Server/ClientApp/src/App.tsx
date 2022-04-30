import React, {ReactElement, useState} from 'react';
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
  const [leftMenuVisible, setLeftMenuVisible] = useState(false)
  const [centralElements, setCentralElements] = useState<ReactElement[]>(() => [])

  const hideUpLayer = () => {
    setLeftMenuVisible(false)
    setCentralElements([])
  }
  
  const addCentralElement = (newElement: ReactElement) => {
    setCentralElements([...centralElements, newElement])
    setLeftMenuVisible(false)
    
    return () => {
      setCentralElements(elements => {
        const result = [...elements];
        const elementIndex = elements.indexOf(newElement)
        
        if (elementIndex >= 0) {
          result.splice(elementIndex, 1)
        }
        
        return result;
      })
    }
  }
  const removeLastCentralElement = () => {
    const result = [...centralElements]
    result.splice(result.length - 1, 1)
    setCentralElements(result)
  }
  
  return (
    <div className="App">
      <UpLayerContext.Provider value={{addCentralElement, hide: hideUpLayer}}>
        <LeftMenuContext.Provider value={{setVisible: setLeftMenuVisible}}>
          <UpLayer
            leftElementVisible={leftMenuVisible}
            leftElement={<LeftMenu visible={leftMenuVisible}/>}
            centerElements={centralElements}
            onClick={removeLastCentralElement}/>
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
