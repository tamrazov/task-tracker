import React, {useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';

import {StateContext} from '../../state/stateContex';
import {RegisterType} from '../../types/types';
import {registerRequest} from '../../requests/requests';

export interface RegistrationProps {
}

const Registration: React.SFC<RegistrationProps> = () => {
    const history = useHistory();
  const [state, setState] = useContext(StateContext);
  const [errors, setErrors] = useState<any>({});
  const form = useForm();

  const onSubmit = (data: any) => {
    const res: Promise<RegisterType> = registerRequest({
      name: data.name,
      email: data.email,
      password: data.password,
      fullname: data.fullname,
      secretAnswer: data.secretAnswer,
      secretQuestion: data.secretQuestion
    });
    res.then((data) => {
      if(!!data.errors) {
        setErrors(data.errors);
      } else {
        setErrors({});
        setState({
          ...state,
          id: data.id,
          isLogin: true
        })
        history.push('/tasks');
      }
    })
  };

  return (
    <React.Fragment>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16}}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            control={form.control}
            render={({field}) => (
               <Form.Group controlId="formBasicEmail" style={{marginBottom: 16}}>
                  <Form.Label>Имя</Form.Label>
                  <Form.Control {...field} placeholder="Введите имя" />
                  {!!errors && errors.name && <Form.Text style={{color: 'red'}} >{errors.name}</Form.Text>}
                </Form.Group>
            )}
            name="name"
            defaultValue=""
          />
          <Controller
            control={form.control}
            render={({field}) => (
               <Form.Group controlId="formBasicEmail" style={{marginBottom: 16}}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control {...field} type="email" placeholder="Введите email" />
                  {!!errors && errors.email && <Form.Text style={{color: 'red'}} >{errors.email}</Form.Text>}
                </Form.Group>
            )}
            name="email"
            defaultValue=""
          />
          <Controller
            control={form.control}
            render={({field}) => (
               <Form.Group controlId="formBasicEmail" style={{marginBottom: 16}}>
                  <Form.Label>Полное имя</Form.Label>
                  <Form.Control {...field} placeholder="Введите полное имя" />
                </Form.Group>
            )}
            name="fullname"
            defaultValue=""
          />
          <Controller
            control={form.control}
            render={({field}) => (
               <Form.Group controlId="formBasicEmail" style={{marginBottom: 16}}>
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control {...field} placeholder="Введите пароль" />
                  {!!errors && errors.password && <Form.Text style={{color: 'red'}}>{errors.password}</Form.Text>}
                </Form.Group>
            )}
            name="password"
            defaultValue=""
          />
          <Controller
            control={form.control}
            render={({field}) => (
               <Form.Group controlId="formBasicEmail" style={{marginBottom: 16}}>
                  <Form.Label>Секретный вопрос</Form.Label>
                  <Form.Control {...field} placeholder="Введите секретный вопрос" />
                  {!!errors && errors.secretQuestion && <Form.Text style={{color: 'red'}}>{errors.secretQuestion}</Form.Text>}
                </Form.Group>
            )}
            name="secretQuestion"
            defaultValue=""
          />
          <Controller
            control={form.control}
            render={({field}) => (
               <Form.Group controlId="formBasicEmail" style={{marginBottom: 16}}>
                  <Form.Label>Ответ на секретный вопрос</Form.Label>
                  <Form.Control {...field} placeholder="Введите ответ на секретный вопрос" />
                  {!!errors && errors.secretAnswer && <Form.Text style={{color: 'red'}}>{errors.secretAnswer}</Form.Text>}
                </Form.Group>
            )}
            name="secretAnswer"
            defaultValue=""
          />
          <Button variant="primary" type="submit">
            Войти
          </Button>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
            <Link to='/login'>
              <Form.Text style={{marginLeft: 10}}>Войти
              </Form.Text>
            </Link>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Registration;