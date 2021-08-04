import React, {useContext, useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useForm, Controller} from 'react-hook-form';
import {StateContext} from '../../state/stateContex';
import {Profile} from '../../types/types';
import {getProfileRequest, editProfileRequest} from '../../requests/requests';
import ButtonWithLoader from '../../ui/ButtonWithLoader/ButtonWithLoader';

export interface ProfileComponentProps {
}
 
const ProfileComponent: React.SFC<ProfileComponentProps> = () => {
  const [state, setState] = useContext(StateContext);
  const worker = state.worker;
  const [profile, setProfile] = useState<Profile | any>(null);
  const [errors, setErrors] = useState<any>({});
  const form = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: any) => {
    worker.port.postMessage(['put', '/profile', {
      ...data,
      id: '1'
    }])
    worker.port.onmessage = function (e: any) {
      let data = e.data[0];
      if(!!data['errors']) {
        setErrors(data['errors']);
      } else {
        setErrors({});
        setProfile(data['currentUser']);
      }
    }
};

  useEffect(() => {
    const fetchProfile = async () => {
      worker.port.postMessage(['get', '/profile', state.id])
      worker.port.onmessage = function (e: any) {
        let data = e.data;
        setProfile(data);
      }
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!!profile) {
      form.reset({
        name: profile.name,
        email: profile.email,
        fullname: profile.fullname,
        password: profile.password,
        secretQuestion: profile.secretQuestion,
        secretAnswer: profile.secretAnswer,
      })
    }
  }, [profile]);

  return (
    <div>
      { !!profile &&
        <div>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              control={form.control}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control autoComplete='off' {...field} placeholder="Введите имя" />
                    {!!errors && errors.name && <Form.Text style={{color: 'red'}} >{errors.name}</Form.Text>}
                  </Form.Group>
              )}
              name="name"
            />
            <Controller
              control={form.control}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                    <Form.Label>Тип</Form.Label>
                    <Form.Control {...field} placeholder="Введите email" />
                    {!!errors && errors.email && <Form.Text style={{color: 'red'}} >{errors.email}</Form.Text>}
                  </Form.Group>
              )}
              name="email"
            />
            <Controller
              control={form.control}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                    <Form.Label>Полное имя</Form.Label>
                    <Form.Control {...field} placeholder="Введите Полное имя" />
                    {!!errors && errors.fullname && <Form.Text style={{color: 'red'}} >{errors.fullname}</Form.Text>}
                  </Form.Group>
              )}
              name="fullname"
            />
            <Controller
              control={form.control}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control {...field} placeholder="Введите пароль" />
                    {!!errors && errors.password && <Form.Text style={{color: 'red'}} >{errors.password}</Form.Text>}
                  </Form.Group>
              )}
              name="password"
            />
            <Controller
              control={form.control}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                    <Form.Label>Секретный вопрос</Form.Label>
                    <Form.Control {...field} placeholder="Введите секретный вопрос" />
                    {!!errors && errors.secretQuestion && <Form.Text style={{color: 'red'}} >{errors.secretQuestion}</Form.Text>}
                  </Form.Group>
              )}
              name="secretQuestion"
            />
            <Controller
              control={form.control}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                    <Form.Label>Ответ на вопрос</Form.Label>
                    <Form.Control {...field} placeholder="Введите ответ на вопрос" />
                    {!!errors && errors.secretAnswere && <Form.Text style={{color: 'red'}} >{errors.secretAnswer}</Form.Text>}
                  </Form.Group>
              )}
              name="secretAnswer"
            />
          </Form>
          <ButtonWithLoader
            text='Сохранить'
            isLoading={isLoading}
            variant="primary"
            handleClick={form.handleSubmit(onSubmit)}
          />
          <Button style={{marginLeft: 10}} variant="danger" onClick={() => setState({...state, isLogin: false})}>
            Выйти
          </Button>
        </div>
      }
    </div>
  );
}

export default ProfileComponent;