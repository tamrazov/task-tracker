import React, {useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';

import {StateContext} from '../../state/stateContex';
import {LoginType} from '../../types/types';
import {loginRequest} from '../../requests/requests';

type FormData = {
  email: string;
  password: string;
};

export interface LoginProps {
}

const Login: React.SFC<LoginProps> = () => {
  const history = useHistory();
  const [state, setState] = useContext(StateContext);
  const worker = state.worker;
  const [error, setError] = useState('');
  const form = useForm<FormData>();

  const onSubmit = (data: any) => {
    worker.port.postMessage(['post', '/login', {
      email: data.email,
      password: data.password
    }])
    worker.port.onmessage = function (e: any) {
      let data = e.data[0];
      if(!!data['errors']) {
        setError(data['errors']);
      } else {
        setError('');
        setState({
          ...state,
          id: data.id,
          isLogin: true
        })
      }
    }
  };

  return (
    <React.Fragment>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16}}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            control={form.control}
            render={({field}) => (
               <Form.Group controlId="formBasicEmail" style={{marginBottom: 16}}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control {...field} type="email" placeholder="Введите email" />
                </Form.Group>
            )}
            name="email"
            defaultValue=""
          />
          {!!error && <Form.Text style={{color: 'red'}} >{error}</Form.Text>}
          <Controller
            control={form.control}
            render={({field}) => (
               <Form.Group controlId="formBasicPass" style={{marginBottom: 16}}>
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control {...field} type="password" placeholder="Введите пароль" />
                </Form.Group>
            )}
            name="password"
            defaultValue=""
          />
          <Button variant="primary" type="submit">
            Войти
          </Button>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
            <Link to='/forgotpass'>
              <Form.Text style={{marginLeft: 10}}>Забыли пароль? Восстановить</Form.Text>
            </Link>
            <Link to='/registration'>
              <Form.Text style={{marginLeft: 10}}>Зарегестрироваться
              </Form.Text>
            </Link>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};
 
export default Login;