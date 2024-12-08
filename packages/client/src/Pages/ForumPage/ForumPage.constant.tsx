import { TMessage } from '@Components';

type TRooms = {
  [key: number]: TMessage[];
};

export const rooms = [
  { id: 1, name: 'Обсуждение 1' },
  { id: 2, name: 'Обсуждение 2' },
  { id: 3, name: 'Обсуждение 3' },
];

export const roomMessages: TRooms = {
  1: [
    { id: 101, text: 'Привет!', user: 'Пользователь 1', time: '10:00' },
    { id: 102, text: 'Как дела?', user: 'Пользователь 2', time: '10:01' },
    {
      id: 103,
      text: 'Всё отлично! А у тебя как?',
      user: 'Пользователь 1',
      time: '10:02',
    },
  ],
  2: [
    {
      id: 201,
      text: 'Доброго времени суток!',
      user: 'Пользователь 3',
      time: '11:30',
    },
    { id: 202, text: 'Что нового?', user: 'Пользователь 4', time: '11:31' },
    {
      id: 203,
      text: 'Ничего особенного.',
      user: 'Пользователь 3',
      time: '11:32',
    },
  ],
  3: [
    {
      id: 301,
      text: 'Кто-нибудь здесь?',
      user: 'Пользователь 5',
      time: '12:15',
    },
    { id: 302, text: 'Да, я тут.', user: 'Пользователь 6', time: '12:16' },
    {
      id: 303,
      text: 'Отлично! Как настроение?',
      user: 'Пользователь 5',
      time: '12:17',
    },
  ],
};
