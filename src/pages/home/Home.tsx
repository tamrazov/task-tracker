import React, {useContext} from 'react';
import {StateContext} from '../../state/stateContex';
import { TaskType } from '../../types/types';
import moment from 'moment';
import Task from '../tasks/Task';

export interface HomeProps {
}
 
const Home = ({

}: HomeProps) => {
  const [state, setState] = useContext(StateContext);

  return (
    <div className="home-container">
      <p>Задачи на сегодня ({state.tasks.filter((task: TaskType) => task.time_start === moment().format('YYYY-MM-DD')).length})</p>
      <div className="flex-row-start">
          {state.tasks.filter((task: TaskType) => task.time_start === moment().format('YYYY-MM-DD')).map((task: TaskType) => <Task key={task.id} task={task} />)}
      </div>
    </div>
  );
}
 
export default Home;