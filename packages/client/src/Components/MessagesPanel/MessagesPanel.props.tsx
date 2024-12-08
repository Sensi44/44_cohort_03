export type TMessagesProps = {
  currentRoomMessages: {
    id: number;
    text: string;
    user: string;
    time: string;
  }[];
};

export type TMessage = {
  id: number;
  text: string;
  user: string;
  time: string;
};
