import React, {useContext, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {useForm, Controller} from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import {StateContext} from '../../state/stateContex';
import { TaskType } from "../../types/types";
import {editTaskRequest, removeTaskRequest} from '../../requests/requests';

export interface TaskProps {
  task: TaskType
}
 
const Task = ({task}: TaskProps) => {
  const form = useForm({
    defaultValues: {
      name: task.name,
      priority: task.priority,
      status: task.status,
      time_start: moment(task.time_start).toDate(),
      time_end: moment(task.time_end).toDate(),
      fact_time_start: moment(task.fact_time_start).toDate(),
      fact_time_end: moment(task.fact_time_end).toDate(),
    }
  });
  const [state, setState] = useContext(StateContext);
  const [errors, setErrors] = useState<any>({});
  const [show, setShow] = useState(false);
  const arrStatuses = {
    '0': 'Не выбрана',
    '1': 'Отложенна',
    '2': 'В работе',
    '3': 'Выполнена'
  };

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    form.reset({
      name: task.name,
      priority: task.priority,
      status: task.status,
      time_start: moment(task.time_start).toDate(),
      time_end: moment(task.time_end).toDate(),
      fact_time_start: moment(task.fact_time_start).toDate(),
      fact_time_end: moment(task.fact_time_end).toDate(),
    });
    setShow(true);
  }

  const onSubmit = (data: any) => {
    const res = editTaskRequest({
      ...data,
      id: task.id,
      time_start: moment(data.time_start).toISOString(),
      time_end: moment(data.time_end).toISOString(),
      fact_time_start: moment(data.fact_time_start).toISOString(),
      fact_time_end: moment(data.fact_time_end).toISOString(),
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
        handleClose();
      }
    })
  }

  const handleRemove = () => {
    const res = removeTaskRequest(task.id);
    res.then((data) => {
      setErrors({});
      setState({
        ...state,
        tasks: data.tasks
      });
      handleClose();
    });
  }

  return (
    <React.Fragment>
      <div onClick={handleShow} className='task'>
        <p>
          {task.name}
        </p>
         <p>
          {arrStatuses[task.status]}
        </p>
      </div>
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
          <Button variant="danger" onClick={handleRemove}>
            Удалить
          </Button>
          <Button variant="primary" onClick={form.handleSubmit(onSubmit)}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
 
export default Task;