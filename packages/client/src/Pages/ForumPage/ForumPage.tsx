import { MessagesPanel, RoomsPanel, TMessage } from '@Components';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { roomMessages, rooms } from './ForumPage.constant';

export const ForumPage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<null | number>(null);
  const [currentRoomMessages, setCurrentRoomMessages] = useState<TMessage[]>(
    [],
  );

  useEffect(() => {
    if (selectedRoomId) {
      setCurrentRoomMessages(roomMessages[selectedRoomId]);
    } else {
      setCurrentRoomMessages([]);
    }
  }, [selectedRoomId]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <RoomsPanel rooms={rooms} setSelectedRoomId={setSelectedRoomId} />
      <MessagesPanel currentRoomMessages={currentRoomMessages} />
    </Box>
  );
};
