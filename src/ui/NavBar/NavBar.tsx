import React, {useContext} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Redirect,Link} from "react-router-dom";
import {StateContext} from '../../state/stateContex';

export interface NavBarProps {
}
 
const NavBar: React.SFC<NavBarProps> = () => {
  const [state, setState] = useContext(StateContext);

  return (
    <React.Fragment>
      <Navbar bg="light" expand="sm" style={{paddingLeft: 100}}>
        <Navbar.Brand as={Link} to="/">Главная</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/tasks">
              Задачи
            </Nav.Link>
            <Nav.Link className="profile-button pull-left" as={Link} to="/login">
              { !!state.isLogin ? 'Профиль' : 'Войти'}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;