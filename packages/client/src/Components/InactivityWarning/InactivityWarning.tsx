import { useEffect, useState } from 'react';

import type { FC } from 'react';

interface InactivityWarningProps {
  stopGame: () => void;
}

export const InactivityWarning: FC<InactivityWarningProps> = ({ stopGame }) => {
  const [inactivityTime, setInactivityTime] = useState(0);
  const [warningShown, setWarningShown] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [gameStopped, setGameStopped] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (Notification.permission === 'granted') {
      setPermissionGranted(true);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setPermissionGranted(true);
        }
      });
    }

    const resetInactivityTimer = () => {
      setInactivityTime(0);
      setWarningShown(false);
      setGameStopped(false);
    };

    const checkInactivity = () => {
      if (gameStopped) {
        return;
      }
      setInactivityTime((prev) => prev + 1);

      if (inactivityTime >= 150 && !warningShown) {
        showWarning();
      }

      if (inactivityTime >= 180 && !gameStopped) {
        stopGame();
        setGameStopped(true);
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    };

    const showWarning = () => {
      setWarningShown(true);
      if (permissionGranted) {
        const notification = new Notification('Внимание!', {
          body: 'Вы давно не совершали действий. Игра будет остановлена через 30 секунд.',
        });

        notification.onclick = () => {
          window.focus();
        };
      }
    };

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);

    const id = setInterval(checkInactivity, 1000);
    setIntervalId(id);

    return () => {
      clearInterval(id);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
    };
  }, [inactivityTime, warningShown, permissionGranted, gameStopped]);

  return null;
};
