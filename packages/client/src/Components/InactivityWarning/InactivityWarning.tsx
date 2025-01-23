import { useEffect, useState } from 'react';

import {
  INACTIVITY_STOP_THRESHOLD,
  INACTIVITY_WARNING_THRESHOLD,
} from '@Constants';

import type { FC } from 'react';

interface InactivityWarningProps {
  stopGame: () => void;
}

export const InactivityWarning: FC<InactivityWarningProps> = ({ stopGame }) => {
  const [inactivityTime, setInactivityTime] = useState(0);
  const [isShowWarning, setIsShowWarning] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [gameStopped, setGameStopped] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (Notification.permission === 'granted') {
      setIsPermissionGranted(true);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setIsPermissionGranted(true);
        }
      });
    }

    const resetInactivityTimer = () => {
      setInactivityTime(0);
      setIsShowWarning(false);
      setGameStopped(false);
    };

    const checkInactivity = () => {
      if (gameStopped) {
        return;
      }
      setInactivityTime((prev) => prev + 1);

      if (inactivityTime >= INACTIVITY_WARNING_THRESHOLD && !isShowWarning) {
        showWarning();
      }

      if (inactivityTime >= INACTIVITY_STOP_THRESHOLD && !gameStopped) {
        stopGame();
        setGameStopped(true);
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    };

    const showWarning = () => {
      setIsShowWarning(true);
      if (isPermissionGranted) {
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
  }, [inactivityTime, isShowWarning, isPermissionGranted, gameStopped]);

  return null;
};
