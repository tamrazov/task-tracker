import React, {useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';

import {StateContext} from '../../state/stateContex';
import {ForgotType} from '../../types/types';
import {forgotEmailRequest} from '../../requests/requests';

type FormData = {
  email: string;
  secretAnswer: string;
};

export interface ForgorPassProps {
}

const ForgorPass: React.SFC<ForgorPassProps> = () => {
 const history = useHistory();
  const [state, setState] = useContext(StateContext);
  const [mode, setMode] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [answer, setAnswer] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const form = useForm<FormData>();

  const onSubmit = (data: any) => {
    if (mode == 'recovery') {
      if (answer == secretAnswer) {
        setState({
          ...state,
          id: id,
          isLogin: true
        });
        history.push('/tasks');
      } else {
        setError('invalid answer');
      }
    } else {
      const res: Promise<ForgotType> = forgotEmailRequest(data.email);
      res.then((data) => {
        if(!!data.error) {
          setError(data.error);
        } else {
          setError('');
          setMode('recovery');
          setSecretQuestion(data.secretQuestion || '');
          setSecretAnswer(data.secretAnswer || '');
          setId(data.id || '')
        }
      })
    }
  };

  return (
    <React.Fragment>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16}}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          { mode !== 'recovery' ?
            <Controller
              key='email'
              control={form.control}
              render={({field}) => (
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...field} type="email" placeholder="Введите email" />
                  </Form.Group>
              )}
              name="email"
              defaultValue=""
            />
           :
            <Controller
              key='secretAnswer'
              control={form.control}
              render={({field}) => (
                <Form.Group>
                    <Form.Label>{secretQuestion}</Form.Label>
                    <Form.Control onChange={(e) => setAnswer(e.target.value)} placeholder="Ответьте на секретный вопрос" />
                  </Form.Group>
              )}
              name="secretAnswer"
              defaultValue=""
            />
          }
          {!!error && <Form.Text style={{color: 'red'}} >{error}</Form.Text>}
          <div style={{marginTop: 16}}>
            <Button variant="primary" type="submit">
              Восстановить
            </Button>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};
 
export default ForgorPass;