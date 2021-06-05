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
 
const Task: React.SFC<TaskProps> = ({task}) => {
  const form = useForm({
    defaultValues: {
      name: task.name,
      type: task.type,
      time_start: new Date(task.time_start),
      time_end: new Date(task.time_end)
    }
  });
  const [state, setState] = useContext(StateContext);
  const [errors, setErrors] = useState<any>({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    form.reset({
      name: task.name,
      type: task.type,
      time_start: new Date(task.time_start),
      time_end: new Date(task.time_end)
    });
    setShow(true);
  }

  const onSubmit = (data: any) => {
    const res = editTaskRequest({
      ...data,
      id: task.id,
      time_start: moment(data.time_start).format('MM/DD/YYYY'),
      time_end: moment(data.time_end).format('MM/DD/YYYY')
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
          {task.type}
        </p>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{task.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    <Form.Control {...field} placeholder="Введите тип" />
                    {!!errors && errors.type && <Form.Text style={{color: 'red'}} >{errors.type}</Form.Text>}
                  </Form.Group>
              )}
              name="type"
            />
            <Controller
              name="time_start"
              control={form.control}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                  <Form.Label>Дата начала</Form.Label>
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    className="datepicker"
                  />
                  {!!errors && errors.time_start && <Form.Text style={{color: 'red'}}>{errors.time_start}</Form.Text>}
                </Form.Group>
              )}
            />
            <Controller
              name="time_end"
              control={form.control}
              render={({field}) => (
                <Form.Group style={{marginBottom: 16}}>
                  <Form.Label>Дата конца</Form.Label>
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    className="datepicker"
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
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
 
export default Task;