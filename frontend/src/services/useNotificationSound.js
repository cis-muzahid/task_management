import useSound from 'use-sound';
import NotificationSound from '../assest/audio/mixkit-happy-bells-notification-937.mp3'; 

const useNotificationSound = () => {
  const [play, {isPlaying }] = useSound(NotificationSound, {
    volume: 1,
    onload: () => console.log('Sound loaded!'),
    onplayerror: (error) => console.error('Sound play error:', error),
  });

  const playNotification = () => {
    if (!isPlaying) {
        play();
      }
  }

  return { playNotification };
};

export default useNotificationSound;
