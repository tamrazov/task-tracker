import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {StateProvider} from './state/stateContex';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap styles;
import NavBar from './ui/NavBar/NavBar';
import ForgotPass from './pages/login/ForgotPass';
import Registration from './pages/login/Registration';
import Main from './pages/login/Main';
import Tasks from './pages/tasks/Tasks';

const App: React.SFC = () => {
  return (
    <StateProvider>
      <Router>
        <div>
          <NavBar />
          <div style={{paddingLeft: 50, paddingRight: 50}}>
            <Switch>
              <Route exact path="/">
                <div>Home</div>
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