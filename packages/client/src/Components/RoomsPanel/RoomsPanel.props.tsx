type TRooms = {
  id: number;
  name: string;
};

export type TRoomsPanelProps = {
  rooms: TRooms[];
  setSelectedRoomId: (payload: number) => void;
};
