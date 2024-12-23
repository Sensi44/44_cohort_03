export type TMessagesProps = {
  currentRoomMessages: TMessage[];
};

export type TMessage = {
  id: number;
  text: string;
  user: string;
  time: string;
};
