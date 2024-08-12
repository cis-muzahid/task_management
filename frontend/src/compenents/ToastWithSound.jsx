// ToastWithSound.js

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import useSound from "use-sound";
import "react-toastify/dist/ReactToastify.css";
import NotificationSound from "../assest/audio/mixkit-happy-bells-notification-937.mp3";

const ToastWithSound = ({ onNotify }) => {
  const [play] = useSound(NotificationSound, {
    volume: 0.5, // Adjust the volume as needed
  });

  // Function to play the sound and show the toast
  const notify = () => {
    play();
    toast.warn("message", {
      position: "top-right",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
      theme: "colored",
    });
  };

  // Invoke the onNotify function if provided
  React.useEffect(() => {
    if (onNotify) {
      onNotify(notify);
    }
  }, [onNotify]);

  return <ToastContainer />;
};

export default ToastWithSound;
