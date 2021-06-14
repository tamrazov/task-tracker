import React, {useContext, useEffect, useState, useCallback} from 'react';
import {StateContext} from '../../state/stateContex';
import {TasksListType, TaskType} from '../../types/types';
import {getTasksListRequest} from '../../requests/requests';
import {Form} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import moment from 'moment';
import {debounce} from '../../utils/utils';

import Task from './Task';
import AddTaskModal from './AddTaskModal';

export interface TasksProps {
}
 
const Tasks: React.SFC<TasksProps> = () => {
  const [state, setState] = useContext(StateContext);
  const [filters, setFilters] = useState({
    name: false,
    date: false,
  });
	const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');

  const fetchTasks = (str: string) => {
    const res: Promise<TasksListType> = getTasksListRequest(str);
    res.then((data) => {
      if (!!data.errors && !!data.errors.error) {
        setError(data.errors.error);
      }
      setState({
        ...state,
        tasks: data.list
      })
    });
  }

  const dFilterName = useCallback(debounce<typeof fetchTasks>(fetchTasks, 300), []);

  const handleChangeName = (newName: string) => {
    setName(newName);
    dFilterName(newName);
  }
  
  useEffect(() => {
    fetchTasks(name);
  }, [filters.name])

  useEffect(() => {
    if (!!error) {
      const interval = setInterval(() => fetchTasks(name), 2000);

      return () => clearInterval(interval);
    }
  }, [error])

  return (
    <React.Fragment>
      { error ?
        <React.Fragment>
          <div>Loading...</div>
        </React.Fragment>
       : state.tasks &&
        <React.Fragment>
          <div className="task-container">
            <div>
              <AddTaskModal />
              <div className="col-12" style={{display: 'flex'}}>
                {!!filters &&
                  <React.Fragment>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label='Включить фильтр по имени'
                        defaultChecked={false}
                        onChange={() => {setFilters({...filters, name: !filters.name}); setName('')}}
                      />
                      <Form.Label>Фильтр по названию</Form.Label>
                      <Form.Control
                        value={name}
                        onChange={(e) => !!filters.name ? handleChangeName(e.target.value) : null}
                        placeholder="Название"
                      />
                    </Form.Group>
                    <Form.Group style={{display: 'flex', flexDirection: 'column'}}>
                      <Form.Check
                        type="checkbox"
                        label='Включить фильтр по дате'
                        defaultChecked={false}
                        onChange={() => setFilters({...filters, date: !filters.date})}
                      />
                      <Form.Label>Фильтр по дате</Form.Label>
                      <DatePicker
                        selected={date}
                        onChange={(value: any) => setDate(value)}
                        className="datepicker"
                      />
                    </Form.Group>
                  </React.Fragment>
                }
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {state.tasks
              .filter((task: TaskType) => !!filters.date ? task.time_start.match(moment(date).format('YYYY-MM-DD')) : true)
              .map((task: TaskType) =>
                <Task key={task.id} task={task} />
              )}
            </div>
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  );
}
 
export default Tasks;