import React, { createContext, useState, useEffect } from 'react';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const initialTime = parseInt(localStorage.getItem('timer-time'), 10) || 0;
  const initialRunningState = JSON.parse(localStorage.getItem('timer-isRunning')) || false;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(initialRunningState);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    localStorage.setItem('timer-time', time.toString());
    localStorage.setItem('timer-isRunning', JSON.stringify(isRunning));
  }, [time, isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem('timer-time');
    localStorage.removeItem('timer-isRunning');
  };
//   const reStartTimer = () => {
//     localStorage.setItem('timer-time', 0);
//     localStorage.setItem('timer-isRunning', true);
//   };

  return (
    <TimerContext.Provider value={{ time, isRunning, startTimer, stopTimer, resetTimer, setTime, setIsRunning }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerProvider, TimerContext };
