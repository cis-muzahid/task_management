import React, { createContext, useState, useEffect, useRef } from 'react';
import showWarningToast from "../compenents/warningToaster";
import NotificationSound from "../assest/audio/mixkit-happy-bells-notification-937.mp3";

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const audioPlayer = useRef(null);

  // Initialize time from localStorage, defaulting to 0 if not set
  const initialTime = parseInt(localStorage.getItem('timer-time'), 10);
  const initialRunningState = JSON.parse(localStorage.getItem('timer-isRunning')) || false;

  const [time, setTime] = useState(isNaN(initialTime) ? 0 : initialTime); // Set default to 0 if not a number
  const [isRunning, setIsRunning] = useState(initialRunningState);
  const [currentStartedTask, setCurrentStartedTask] = useState({ title: '', description: '', total_time_to_complete: localStorage.getItem("started_task_time_to_complete") || 0, start_time: '' });


  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false); // Track if audio is enabled


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


 // Initialize audio context and buffer
 useEffect(() => {
  if (isAudioEnabled) { // Ensure this only runs when audio is enabled
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    fetch(NotificationSound)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(buffer => setAudioBuffer(buffer));
  }
}, [isAudioEnabled]);

const playAudio = () => {
  if (audioContext && audioBuffer) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  }
};


  useEffect(() => {
    if (currentStartedTask.start_time && isRunning) {
      const timeToCompleteInSeconds = localStorage.getItem('started_task_time_to_complete') * 60;
      if (time >= timeToCompleteInSeconds) {
        if (time === timeToCompleteInSeconds || (time - timeToCompleteInSeconds) % 60 === 0) {
          showWarningToast("Time exceeded, add some more time");
          playAudio();
        }
      }
    }
  }, [time, currentStartedTask]);


  // const playAudio = () => {
  //   if (audioPlayer.current) {
  //     audioPlayer.current
  //       .play()
  //       .then(() => {
  //         console.log("Audio played successfully");
  //       })
  //       .catch((error) => {
  //         console.error("Failed to play audio:", error);
  //       });
  //   }
  // };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem('timer-time');
    localStorage.removeItem('timer-isRunning');
  };

  return (
    <TimerContext.Provider value={{ time, isRunning, startTimer, stopTimer, resetTimer, setTime, setIsRunning }}>
      {children}
      <audio ref={audioPlayer} src={NotificationSound} />
    </TimerContext.Provider>
  );
};

export { TimerProvider, TimerContext };
