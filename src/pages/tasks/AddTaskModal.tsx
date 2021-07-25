import React, {useContext, useState} from 'react';
import {StateContext} from '../../state/stateContex';
import {addTaskRequest} from '../../requests/requests';
import {Modal, Button, Form} from 'react-bootstrap';
import {useForm, Controller} from 'react-hook-form';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {useHistory} from 'react-router-dom';

export interface AddTaskModalProps {
}
 
const AddTaskModal: React.SFC<AddTaskModalProps> = () => {
  const history = useHistory();
  const form = useForm({defaultValues: {
    name: '',
    status: '0',
    priority: '0',
    time_start: new Date(),
    time_end: new Date(),
  }});
  const [state, setState] = useContext(StateContext);
  const [errors, setErrors] = useState<any>({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data: any) => {
    const res = addTaskRequest({
      ...data,
      status: +data.status,
      priority: +data.priority,
      time_start: moment(data.time_start).toISOString(),
      time_end: moment(data.time_end).toISOString()
    });
    res.then((data) => {
      if(!!data.errors) {
        setErrors(data.errors);
      } else {
        setErrors({});
        setState({
          ...state,
          tasks: data.tasks
        });
        form.reset();
        handleClose();
      }
    })
  };

  return (
    <React.Fragment>
      <Button className="button-add" size="sm" onClick={handleShow}>Добавить задачу</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить задачу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
            <Form.Group style={{marginBottom: 16}}>
              <Form.Label>Статус</Form.Label>
              <Controller
                render={
                  ({ field }) =>
                  <Form.Control {...field} as="select">
                    <option value="0">Выберите статус</option>
                    <option value="1">Отложенна</option>
                    <option value="2">В работе</option>
                    <option value="3">Выполнена</option>
                  </Form.Control>
                }
                control={form.control}
                name="status"
              />
              {!!errors && errors.status && <Form.Text style={{color: 'red'}}>{errors.status}</Form.Text>}
            </Form.Group>
            <Form.Group style={{marginBottom: 16}}>
              <Form.Label>Приоритет</Form.Label>
              <Controller
                render={
                  ({ field }) =>
                  <Form.Control {...field} as="select">
                    <option value="0">Выберите приоритет</option>
                    <option value="1">низкий</option>
                    <option value="2">важно</option>
                    <option value="3">очень важно</option>
                  </Form.Control>
                }
                control={form.control}
                name="priority"
              />
              {!!errors && errors.priority && <Form.Text style={{color: 'red'}}>{errors.priority}</Form.Text>}
            </Form.Group>
            <Controller
              name="time_start"
              control={form.control}
              defaultValue={new Date()}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                  <Form.Label>Дата начала</Form.Label>
                  <DatePicker
                    dateFormat="dd-MM-yyyy, hh:mm"
                    selected={field.value}
                    onChange={field.onChange}
                    className="datepicker"
                    showTimeSelect
                    customInput={<Form.Control autoComplete='off' />}
                  />
                  {!!errors && errors.time_start && <Form.Text style={{color: 'red'}}>{errors.time_start}</Form.Text>}
                </Form.Group>
              )}
            />
            <Controller
              name="time_end"
              control={form.control}
              defaultValue={new Date()}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                  <Form.Label>Дата конца</Form.Label>
                  <DatePicker
                    dateFormat="dd-MM-yyyy, hh:mm"
                    selected={field.value}
                    onChange={field.onChange}
                    className="datepicker"
                    showTimeSelect
                    customInput={<Form.Control autoComplete='off' />}
                  />
                  {!!errors && errors.time_end && <Form.Text style={{color: 'red'}}>{errors.time_end}</Form.Text>}
                </Form.Group>
              )}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={form.handleSubmit(onSubmit)}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddTaskModal;