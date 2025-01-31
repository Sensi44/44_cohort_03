export type TMessagesProps = {
  currentRoomMessages: TMessage[];
  selectedRoomTitle: string;
  whenCreateComment: (comment: string) => void;
};

export type TMessage = {
  text: string;
  user_id: number;
  createdAt: string;
};
