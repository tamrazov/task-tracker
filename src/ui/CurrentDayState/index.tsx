import React from 'react';
import moment from 'moment';
import { TaskType } from '../../types/types';

type Props = {currentTasks: TaskType[]};

const colors = ['#bf463d', '#92c43b', '#3fbf83', '#417cbf', '#d36ded'];

const CurrentDayState = ({currentTasks}: Props) => {
  const statusMapping = {
    '0': '',
    '1': 'task-postponed-class',
    '2': 'task-inprogress-class',
    '3': 'task-done-class'
  } as const;

  return (
    <div className="row">
      {currentTasks.map((task, i) => {
        let width = moment(task.time_end).diff(task.time_start, 'minutes', true);

        return (
          <div
            key={task.id}
            style={{backgroundColor: colors[i], width: width}}
            className={`item-row ${statusMapping[task.status]}`}
          >{task.id}</div>
      )})}
    </div>
  );
}

export default CurrentDayState;
