import React, { createContext, useState, useEffect, useRef } from 'react';
import showWarningToast from "../compenents/warningToaster";
import useNotificationSound from './useNotificationSound';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const audioPlayer = useRef(null);

  const initialTime = parseInt(localStorage.getItem('timer-time'), 10);
  const initialRunningState = JSON.parse(localStorage.getItem('timer-isRunning')) || false;
  const initialUserInteractionState = JSON.parse(localStorage.getItem('user-has-interacted')) || false;

  const [time, setTime] = useState(isNaN(initialTime) ? 0 : initialTime);
  const [isRunning, setIsRunning] = useState(initialRunningState);
  const [currentStartedTask, setCurrentStartedTask] = useState({ title: '', description: '', total_time_to_complete: localStorage.getItem("started_task_time_to_complete") || 0, start_time: '' });
  
  const { playNotification } = useNotificationSound();

  const [userHasInteracted, setUserHasInteracted] = useState(false);


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

  useEffect(() => {
    setCurrentStartedTask({
      total_time_to_complete: localStorage.getItem("started_task_time_to_complete") || 0,
      start_time: localStorage.getItem("started_task_start_date") || 0,
    });
  }, []);

  useEffect(() => {
    if (currentStartedTask.start_time && isRunning) {
      const timeToCompleteInSeconds = localStorage.getItem('started_task_time_to_complete') * 60;
      if (time >= timeToCompleteInSeconds) {
        if (time === timeToCompleteInSeconds || (time - timeToCompleteInSeconds) % 10 === 0) {
          showWarningToast("Time exceeded, add some more time");
          // playAudio();
          console.log(userHasInteracted)
          playNotification()
        }
      }
    }
  }, [time, currentStartedTask,userHasInteracted]);

  const playAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current
        .play()
        .then(() => {
          console.log("Audio played successfully");
        })
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
    }
  };

  useEffect(() => {
    const isInterected = JSON.parse(localStorage.getItem('user-has-interacted')) || false;
    console.log(isInterected)
    if(isInterected){
      const buttonElement = document.getElementById('triggerButton')
      if(buttonElement){
        console.log("clickedddd")
        buttonElement.click()
      }
    }
  }, []);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setUserHasInteracted(false)
    localStorage.removeItem('timer-time');
    localStorage.removeItem('timer-isRunning');
    localStorage.removeItem('user-has-interacted');
  };

  const handleUserInteraction = () => {
    if (!userHasInteracted) {
      console.log("Userrrrrr")
      setUserHasInteracted(true);
      localStorage.setItem('user-has-interacted',true)
    }
  };

  return (
    <TimerContext.Provider value={{ time, isRunning, startTimer, stopTimer, resetTimer, setTime, setIsRunning ,handleUserInteraction}}>
      {children}
      {/* <audio ref={audioPlayer} src={NotificationSound} autoPlay/> */}
      <button
        style={{ display: 'none' }}
        id='triggerButton'
        onClick={handleUserInteraction}
      >
        Hidden Button
      </button>
    </TimerContext.Provider>
  );
};

export { TimerProvider, TimerContext };
