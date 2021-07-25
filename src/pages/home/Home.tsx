import React, {useContext} from 'react';
import moment from 'moment';
import {StateContext} from '../../state/stateContex';
import { TaskType } from '../../types/types';

import Task from '../tasks/Task';
import CurrentDayState from '../../ui/CurrentDayState/index';

export interface HomeProps {
}
 
const Home = ({

}: HomeProps) => {
  const [state, setState] = useContext(StateContext);
  const currentTasks = state.tasks.filter((task: TaskType) => moment(moment(task.time_start).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD')))

  return (
    <div className="home-container">
      <p>Задачи на сегодня {state.tasks.filter((task: TaskType) => moment(moment(task.time_start).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD'))).length}.</p>
      <CurrentDayState currentTasks={currentTasks}  />
      <div className="flex-row-start">
          {state.tasks
            .filter((task: TaskType) => moment(moment(task.time_start).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD')))
            .map((task: TaskType) => <Task key={task.id} task={task} />)
          }
      </div>
    </div>
  );
}
 
export default Home;