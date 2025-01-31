type TRooms = {
  id: number;
  title: string;
};

export type TRoomsPanelProps = {
  rooms: TRooms[];
  setSelectedRoomId: (id: number) => void;
  whenAddTopic: (name: string) => void;
};
