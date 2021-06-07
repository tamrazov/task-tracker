import React, {useContext} from 'react';
import {StateContext} from '../../state/stateContex';
import Login from './Login';
import Profile from '../profile/Profile';

export interface MainProps {
}

const Main: React.SFC<MainProps> = () => {
  const [state, setState] = useContext(StateContext);

  return (
    <React.Fragment>
      { !!state.isLogin ?
        <Profile />
       :
        <Login />
      }
    </React.Fragment>
  );
};

export default Main;