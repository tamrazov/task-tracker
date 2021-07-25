import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {StateProvider} from './state/stateContex';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap styles;

import NavBar from './ui/NavBar/NavBar';
import ForgotPass from './pages/login/ForgotPass';
import Registration from './pages/login/Registration';
import Main from './pages/login/Main';
import Tasks from './pages/tasks/Tasks';
import Home from './pages/home/Home';

const worker = new SharedWorker("/worker.js");

const App: React.SFC = () => {
  useEffect(() => {
    worker.port.start();
    console.log('worker.port.start')
    worker.port.onmessage = function (e: any) {
      console.log(e, "e worker");
    }
    worker.port.postMessage('hello')
  }, [])
  
  return (
    <StateProvider>
      <Router>
        <div>
          <NavBar />
          <div style={{paddingLeft: 50, paddingRight: 50}}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/tasks" exact component={Tasks} />
              <Route path="/login" exact component={Main} />
              <Route path="/registration" exact>
                <Registration />
              </Route>
              <Route path="/forgotpass" exact>
                <ForgotPass />
              </Route>
              <Route>
                <div>Page not found</div>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </StateProvider>
  );
}
 
export default App;