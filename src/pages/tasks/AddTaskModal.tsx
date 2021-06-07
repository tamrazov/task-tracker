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
  const form = useForm();
  const [state, setState] = useContext(StateContext);
  const [errors, setErrors] = useState<any>({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data: any) => {
    console.log(moment(data))
    const res = addTaskRequest({
      ...data,
      time_start: moment(data.time_start).format('YYYY-MM-DD'),
      time_end: moment(data.time_end).format('YYYY-MM-DD')
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
      <Button onClick={handleShow}>Добавить задачу</Button>
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
              defaultValue=""
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
              defaultValue=""
            />
            <Controller
              name="time_start"
              control={form.control}
              defaultValue={new Date()}
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
              defaultValue={new Date()}
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
          <Button variant="primary" onClick={form.handleSubmit(onSubmit)}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddTaskModal;