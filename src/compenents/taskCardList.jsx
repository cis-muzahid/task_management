import React, { useState } from 'react';

const TaskCard = ({ task }) => {

  function calculateTimeTaken(startTime, endTime) {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const differenceInMilliseconds = end - start;
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
          <td>{calculateTimeTaken(task.start_time, task.end_time)}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
    </>
  );
};

export default TaskCard;
